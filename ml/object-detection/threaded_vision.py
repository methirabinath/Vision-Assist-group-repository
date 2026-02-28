import cv2
import threading
import queue
import pyttsx3
import os

# --- STEP 1: Non-blocking Speech Setup ---
speech_q = queue.Queue(maxsize=5)

def speech_worker():
    # Use 'espeak' for better compatibility on Raspberry Pi OS
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
        finally:
            speech_q.task_done()

# Start the speech thread in the background
threading.Thread(target=speech_worker, daemon=True).start()

def say_async(text):
    if not speech_q.full():
        try:
            speech_q.put_nowait(text)
        except queue.Full:
            pass

# --- STEP 2: Load COCO Model Configuration ---
# Ensure these files are in your project directory
config_path = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
weights_path = 'frozen_inference_graph.pb'
class_file = 'coco.names'

with open(class_file, 'rt') as f:
    class_names = f.read().rstrip('\n').split('\n')

net = cv2.dnn_DetectionModel(weights_path, config_path)
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

# --- STEP 3: Main Detection Loop ---
cap = cv2.VideoCapture(0)
cap.set(3, 640) # Width
cap.set(4, 480) # Height

print("Starting Vision Assist... Press 'q' to exit.")

try:
    while True:
        success, img = cap.read()
        if not success:
            break

        class_ids, confs, bbox = net.detect(img, confThreshold=0.5)

        if len(class_ids) != 0:
            for class_id, confidence, box in zip(class_ids.flatten(), confs.flatten(), bbox):
                label = class_names[class_id - 1]
                
                # Draw visual feedback
                cv2.rectangle(img, box, color=(0, 255, 0), thickness=2)
                cv2.putText(img, label.upper(), (box[0] + 10, box[1] + 30),
                            cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

                # Trigger non-blocking speech
                say_async(label)

        cv2.imshow("Vision Assist - Raspberry Pi 4", img)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

finally:
    # Graceful Shutdown
    cap.release()
    cv2.destroyAllWindows()
    speech_q.put(None) # Signal the thread to stop
    print("System offline.")