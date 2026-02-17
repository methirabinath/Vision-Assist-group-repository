from ultralytics import YOLO
import cv2
import pyttsx3
import time

# =========================
# SETTINGS (you can change)
# =========================
IMG_W, IMG_H = 320, 240
YOLO_IMGSZ = 320
CONF_THRES = 0.55
COOLDOWN = 2.0

engine = pyttsx3.init(driverName="espeak")
engine.setProperty("rate", 160)

model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Camera not opened")
    exit()

last_spoken_time = 0
last_label = None

print("Running object detection with speech. Press Q to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    results = model(frame, imgsz=YOLO_IMGSZ, verbose=False)

    annotated = results[0].plot()
    cv2.imshow("YOLO + Speech", annotated)

    if results[0].boxes is not None and len(results[0].boxes) > 0:
        best = max(results[0].boxes, key=lambda b: float(b.conf[0]))
        label = model.names[int(best.cls[0])]
        conf = float(best.conf[0])

        now = time.time()
        if conf >= CONF_THRES and label != last_label and (now - last_spoken_time) >= COOLDOWN:
            engine.say(label)
            engine.runAndWait()
            last_spoken_time = now
            last_label = label

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()




from ultralytics import YOLO
import cv2
import pyttsx3
import time

IMG_W, IMG_H = 320, 240
YOLO_IMGSZ = 320
CONF_THRES = 0.55
COOLDOWN = 2.0

engine = pyttsx3.init(driverName="espeak")
engine.setProperty("rate", 160)

model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, IMG_W)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, IMG_H)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Camera not opened")
    exit()

last_spoken_time = 0
last_label = None

print("Running object detection with speech. Press Q to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    results = model(frame, imgsz=YOLO_IMGSZ, verbose=False)

    annotated = results[0].plot()
    cv2.imshow("YOLO + Speech", annotated)

    if results[0].boxes is not None and len(results[0].boxes) > 0:
        best = max(results[0].boxes, key=lambda b: float(b.conf[0]))
        label = model.names[int(best.cls[0])]
        conf = float(best.conf[0])

        now = time.time()
        if conf >= CONF_THRES and label != last_label and (now - last_spoken_time) >= COOLDOWN:
            engine.say(label)
            engine.runAndWait()
            last_spoken_time = now
            last_label = label

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
