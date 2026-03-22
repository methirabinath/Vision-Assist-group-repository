def get_directions(start, end):
    url = "https://maps.googleapis.com/maps/api/directions/json"

    params = {
        "origin": f"{start[0]},{start[1]}",
        "destination": f"{end[0]},{end[1]}",
        "mode": "walking",
        "key": GOOGLE_API_KEY
    }

    res = requests.get(url, params=params)
    return res.json()