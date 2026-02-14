
# detecting and giving voice coomands for specific objects



from ultralytics import YOLO
import cv2
import pyttsx3


# Initialize speech engine
engine = pyttsx3.init()
model = YOLO("yolov8n.pt")


cap = cv2.VideoCapture(0)
spoken = set()
while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)

    for box in results[0].boxes:
        cls = int(box.cls[0])
        label = model.names[cls]

        # Speak only important objects once
        if label in ["person", "car", "chair"] and label not in spoken:
            engine.say(f"{label} ahead")
            engine.runAndWait()
            spoken.add(label)

    annotated = results[0].plot()
    cv2.imshow("Blind Cap with Audio", annotated)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    
cap.release()
cv2.destroyAllWindows()