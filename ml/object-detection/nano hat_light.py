# hat_light_smooth.py
# Smooth camera window + YOLO window (updates less often) + non-blocking speech
# Works on Pi with USB camera. Press Q to quit.

from ultralytics import YOLO
import cv2
import pyttsx3
import time
import threading
import queue

# =========================
# SETTINGS
# =========================
CAM_W, CAM_H = 320, 240
CAM_FPS = 30

IMG_SZ = 160            # 160/224/256/320 (bigger = slower)
RUN_YOLO_EVERY = 3       # run YOLO every N frames (bigger = smoother camera, less YOLO updates)

CONF_THRES = 0.55
SPEAK_COOLDOWN = 2.0

SHOW_WINDOW = True      # True = show windows for testing, False = hat/headless mode

# =========================
# NON-BLOCKING SPEECH
# =========================
speech_q = queue.Queue(maxsize=5)

def speech_worker():
    engine = pyttsx3.init(driverName="espeak")
    engine.setProperty("rate", 170)
    while True:
        text = speech_q.get()
        if text is None:
            break
        try:
            engine.say(text)
            engine.runAndWait()
        except Exception:
            pass
        speech_q.task_done()

threading.Thread(target=speech_worker, daemon=True).start()

def say_async(text: str):
    if text is None:
        # stop signal
        try:
            speech_q.put_nowait(None)
        except Exception:
            pass
        return

    # drop speech if queue is full (prevents lag)
    if not speech_q.full():
        speech_q.put_nowait(text)

# =========================
# LOAD MODEL
# =========================
model = YOLO("yolov8n.pt")

# =========================
# CAMERA SETUP (USB cam)
# =========================
cap = cv2.VideoCapture(0, cv2.CAP_V4L2)

# IMPORTANT: keep newest frame only (reduces “glitch / delay”)
try:
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
except Exception:
    pass

cap.set(cv2.CAP_PROP_FRAME_WIDTH, CAM_W)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, CAM_H)
cap.set(cv2.CAP_PROP_FPS, CAM_FPS)

# Try MJPG to reduce USB decode load (often helps)
cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*"MJPG"))

if not cap.isOpened():
    print("Camera not opened")
    raise SystemExit(1)

# =========================
# LOOP VARS
# =========================
last_spoken_time = 0.0
last_label = None
frame_i = 0

print("Running. Press Q to quit (or Ctrl+C).")

try:
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame_i += 1

        # 1) SHOW RAW CAMERA EVERY FRAME (SMOOTH)
        if SHOW_WINDOW:
            cv2.imshow("Camera (smooth)", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # 2) RUN YOLO ONLY SOMETIMES (PREVENTS STUTTER)
        if frame_i % RUN_YOLO_EVERY != 0:
            continue

        results = model(frame, imgsz=IMG_SZ, verbose=False)
        r0 = results[0]

        # SHOW YOLO WINDOW (updates slower)
        if SHOW_WINDOW:
            annotated = r0.plot()
            cv2.imshow("YOLO (updates slower)", annotated)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # SPEAK BEST DETECTION (non-blocking)
        if r0.boxes is not None and len(r0.boxes) > 0:
            best = max(r0.boxes, key=lambda b: float(b.conf[0]))
            label = model.names[int(best.cls[0])]
            conf = float(best.conf[0])

            now = time.time()
            if conf >= CONF_THRES and label != last_label and (now - last_spoken_time) >= SPEAK_COOLDOWN:
                say_async(label)
                last_spoken_time = now
                last_label = label

except KeyboardInterrupt:
    pass
finally:
    cap.release()
    if SHOW_WINDOW:
        cv2.destroyAllWindows()
    say_async(None)
