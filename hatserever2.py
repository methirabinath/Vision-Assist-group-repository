
from flask import Flask, jsonify
from flask_cors import CORS
import threading

app = Flask(__name__)
CORS(app)

# ------------------------
# SYSTEM STATE VARIABLES
# ------------------------

battery_level = 100
fall_detected = False


# ------------------------
# MOBILE APP REQUEST
# ------------------------

@app.route("/status")
def status():
    return jsonify({
        "battery": battery_level,
        "fall": fall_detected
    })





def reset_fall_flag():
    global fall_detected
    fall_detected=True

    threading.Thread(target=reset_fall_flag).start()

    return "fall recorded"

# ------------------------
# FALL ALERT UPDATE
# ------------------------

@app.route("/fall")
def fall():
    global fall_detected
    fall_detected = True
    return "fall recorded"


# ------------------------
# RESET FALL
# ------------------------

@app.route("/reset_fall")
def reset_fall():
    global fall_detected
    fall_detected = False
    return "fall reset"


app.run(host="0.0.0.0", port=5000)
