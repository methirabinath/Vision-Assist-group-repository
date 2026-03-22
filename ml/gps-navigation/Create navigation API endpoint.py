from flask import request, jsonify

@app.route('/navigate', methods=['POST'])
def navigate():
    data = request.get_json()

    dest = data.get("destination")
    if not dest:
        return jsonify({"error": "Destination required"}), 400

    cur = get_current_location(data.get("current_lat"), data.get("current_lon"))
    target = geocode_destination(dest)

    route = get_directions(cur, target)

    return jsonify(route)