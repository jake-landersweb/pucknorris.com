"""Deploy an immutable CI image through Dokploy; never log response env or secrets."""
import json
import os
import time
import urllib.request

COMPOSE_ID = "MqxkGDq0oojImGtwmOI7r"


def api(route, data=None):
    request = urllib.request.Request(
        os.environ["DOKPLOY_URL"].rstrip("/") + "/api/" + route,
        data=json.dumps(data).encode() if data is not None else None,
        headers={"x-api-key": os.environ["DOKPLOY_KEY"], "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


current = api("compose.one?composeId=" + COMPOSE_ID)
lines = [line for line in (current.get("env") or "").splitlines()
         if not line.startswith("IMAGE_TAG=")]
lines.append("IMAGE_TAG=" + os.environ["IMAGE_TAG"])
with open("deploy/compose.yaml") as source:
    compose = source.read()
api("compose.update", {"composeId": COMPOSE_ID, "env": "\n".join(lines) + "\n", "composeFile": compose})
previous = {d["deploymentId"] for d in api("deployment.allByCompose?composeId=" + COMPOSE_ID)}
api("compose.deploy", {"composeId": COMPOSE_ID, "title": "GitHub Actions " + os.environ["IMAGE_TAG"]})
for _ in range(90):
    deployments = api("deployment.allByCompose?composeId=" + COMPOSE_ID)
    fresh = [d for d in deployments if d["deploymentId"] not in previous]
    if fresh:
        status = fresh[0].get("status")
        if status == "error":
            raise SystemExit("Dokploy deployment failed; inspect protected Dokploy logs")
        if status == "done":
            print("Dokploy deployment completed")
            break
    time.sleep(10)
else:
    raise SystemExit("Timed out waiting for Dokploy deployment")
