# hat_light_pro.py
# Version 1 – Smooth preview + throttled YOLO

from ultralytics import YOLO
import cv2

CAM_W, CAM_H = 320, 240
CAM_FPS = 30
IMG_SZ = 160
RUN_YOLO_EVERY = 3
SHOW_WINDOW = True

model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, CAM_W)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, CAM_H)
cap.set(cv2.CAP_PROP_FPS, CAM_FPS)

if not cap.isOpened():
    print("Camera not opened")
    raise SystemExit(1)

frame_i = 0
last_annotated = None

print("Running YOLO smooth mode...")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    frame_i += 1

    # Always show raw camera
    if SHOW_WINDOW:
        cv2.imshow("Camera", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Run YOLO sometimes
    if frame_i % RUN_YOLO_EVERY == 0:
        results = model(frame, imgsz=IMG_SZ, verbose=False)
        last_annotated = results[0].plot()

    if SHOW_WINDOW and last_annotated is not None:
        cv2.imshow("YOLO", last_annotated)

cap.release()
cv2.destroyAllWindows()