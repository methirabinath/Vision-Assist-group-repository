def get_current_location(provided_lat, provided_lon):
    if provided_lat and provided_lon:
        return float(provided_lat), float(provided_lon)

    ref = db.reference("location")
    data = ref.get()

    if data:
        return float(data["lat"]), float(data["lon"])

    return 6.9271, 79.8612