import os

GOOGLE_API_KEY = os.getenv("AIzaSyB-EVy-UqPXRYaBR7EaM_w0iGS6klxOJoQ")

if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY missing")
