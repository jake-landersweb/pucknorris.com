#!/usr/bin/env python3
"""Test the CrossCheck schedule API endpoints for Puck Norris."""

import json
import urllib.request
from datetime import datetime

HOST = "https://3s6ts5yg8a.execute-api.us-west-2.amazonaws.com/api"
TEAM_ID = "Tdc0a36cdb7a747348209ca162b09ee0a"

# Match the formatDate() format: "YYYY-MM-DD HH:MM:SS"
date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
body = json.dumps({"date": date_str}).encode()

endpoints = [
    ("teamSchedule", f"{HOST}/teams/{TEAM_ID}/teamSchedule"),
    ("teamScheduleFull", f"{HOST}/teams/{TEAM_ID}/teamScheduleFull"),
]

for name, url in endpoints:
    print(f"\n{'='*60}")
    print(f"Endpoint: {name}")
    print(f"URL: {url}")
    print(f"Body: {{\"date\": \"{date_str}\"}}")
    print("-" * 60)

    req = urllib.request.Request(
        url,
        data=body,
        method="PUT",
        headers={"Content-Type": "application/json"},
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            raw = resp.read().decode()
            try:
                parsed = json.loads(raw)
                print(f"Status: {status}")
                print(f"Response: {json.dumps(parsed, indent=2)[:2000]}")
            except json.JSONDecodeError:
                print(f"Status: {status}")
                print(f"Raw response: {raw[:2000]}")
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        print(f"HTTP Error {e.code}: {e.reason}")
        print(f"Response: {raw[:2000]}")
    except Exception as e:
        print(f"Error: {e}")
