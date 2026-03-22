import requests

def geocode_destination(query):
    try:
        url = f"https://nominatim.openstreetmap.org/search?q={query}&format=json"
        res = requests.get(url)
        if res.json():
            data = res.json()[0]
            return float(data["lat"]), float(data["lon"])
    except:
        pass

    # fallback
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    res = requests.get(url, params={"address": query, "key": GOOGLE_API_KEY})
    data = res.json()

    if data["status"] == "OK":
        loc = data["results"][0]["geometry"]["location"]
        return loc["lat"], loc["lng"]

    return None, None