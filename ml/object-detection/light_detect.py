





from ultralytics import YOLO
import cv2  
import pyttsx3

# Load YOLOv8 model ( the lightweight version)
model = YOLO("yolov8n.pt") 


# Open webcam
cap = cv2.VideoCapture(0)



while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)
    annotated = results[0].plot()

    cv2.imshow("Blind Assistance Cap", annotated)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()