import pyttsx3
import time

engine = pyttsx3.init(driverName="espeak")
engine.setProperty("rate", 160)

CONF_THRES = 0.55
SPEAK_COOLDOWN = 2.0


engine = pyttsx3.init(driverName="espeak")
engine.setProperty("rate", 160)

last_spoken_time = 0.0
last_label = None


r0 = results[0]
if r0.boxes is not None and len(r0.boxes) > 0:
    best = max(r0.boxes, key=lambda b: float(b.conf[0]))
    label = model.names[int(best.cls[0])]
    conf = float(best.conf[0])

    now = time.time()
    if conf >= CONF_THRES and label != last_label and (now - last_spoken_time) >= SPEAK_COOLDOWN:
        engine.say(label)
        engine.runAndWait()
        last_spoken_time = now
        last_label = label