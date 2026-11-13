"""Deploy an immutable CI image through Dokploy; never log response env or secrets."""
import json
import os
import re
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


# Fail before changing Compose or env if operator-owned routing is missing/drifted.
domains = api("domain.byComposeId?composeId=" + COMPOSE_ID)
for host in ("pucknorris.com", "www.pucknorris.com"):
    matches = [d for d in domains if d.get("host") == host and d.get("path") == "/"]
    expected = ["pucknorris-www@docker"] if host.startswith("www.") else []
    if len(matches) != 1 or not all((
        matches[0].get("enabled") is True,
        matches[0].get("serviceName") == "web", matches[0].get("port") == 3000,
        matches[0].get("https") is True, matches[0].get("certificateType") == "letsencrypt",
        matches[0].get("middlewares") == expected,
        matches[0].get("stripPath") is False, matches[0].get("internalPath") in ("/", None),
    )):
        raise SystemExit("Expected Dokploy Domain missing or drifted: " + host)
current = api("compose.one?composeId=" + COMPOSE_ID)
env = current.get("env") or ""
pattern = r"(?m)^[ \t]*(?:export[ \t]+)?IMAGE_TAG[ \t]*=.*$"
if re.search(pattern, env):
    env = re.sub(pattern, lambda _: "IMAGE_TAG=" + os.environ["IMAGE_TAG"], env)
else:
    env += ("" if not env or env.endswith("\n") else "\n") + "IMAGE_TAG=" + os.environ["IMAGE_TAG"] + "\n"
with open("deploy/compose.yaml") as source:
    compose = source.read()
api("compose.update", {"composeId": COMPOSE_ID, "env": env, "composeFile": compose})
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
