leg = route_data["routes"][0]["legs"][0]

steps = [clean_html(s["html_instructions"]) for s in leg["steps"]]

return jsonify({
    "distance": leg["distance"]["text"],
    "duration": leg["duration"]["text"],
    "instructions": steps
})