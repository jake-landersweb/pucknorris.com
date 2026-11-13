"""Check every published image layer, including files hidden by later layers."""
import json
import pathlib
import sys
import tarfile

bad = []
with tarfile.open(sys.argv[1]) as image:
    manifest = json.load(image.extractfile("manifest.json"))
    for entry in manifest:
        for layer_name in entry["Layers"]:
            with tarfile.open(fileobj=image.extractfile(layer_name), mode="r|*") as layer:
                for member in layer:
                    path = pathlib.PurePosixPath(member.name)
                    name = path.name
                    # Alpine's public CA bundle is expected and contains no keys.
                    if str(path).lstrip("./") in {"etc/ssl/cert.pem", "usr/lib/ssl/cert.pem"}:
                        continue
                    if (name == ".env" or name.startswith(".env.")
                            or name in {".npmrc", "id_rsa", "id_ed25519", "credentials"}
                            or name.endswith((".key", ".pem", ".p12", ".pfx"))):
                        bad.append(member.name)
if bad:
    print("Forbidden file paths in image layers:", *sorted(set(bad)), sep="\n")
    raise SystemExit(1)
print("All image layers checked: no environment or credential files found")
