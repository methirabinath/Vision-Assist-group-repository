import cv2
import threading
import queue
import pyttsx3

# --- Configuration ---
SHOW_WINDOW = True 

# --- STEP 1: Non-blocking Speech Setup ---
speech_q = queue.Queue(maxsize=5)

def speech_worker():
    # driverName="espeak" is best for Raspberry Pi 4 stability
    engine = pyttsx3.init(driverName="espeak")
    engine.setProperty("rate", 170)
    while True:
        text = speech_q.get()
        if text is None: # The exit signal for the background thread
            break
        try:
            engine.say(text)
            engine.runAndWait()
        except Exception:
            pass
        finally:
            speech_q.task_done()

# Start background worker
threading.Thread(target=speech_worker, daemon=True).start()

def say_async(text):
    """Adds to queue; prevents main loop from hanging if speech is busy."""
    if not speech_q.full():
        try:
            speech_q.put_nowait(text)
        except queue.Full:
            pass

# --- STEP 2: Model Assets ---
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

# --- STEP 3: Optimized Camera (Fixes hanging on Pi) ---
cap = cv2.VideoCapture(0, cv2.CAP_V4L2)

try:
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1) # Fresh frames only
except Exception:
    pass

cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*"MJPG"))
cap.set(3, 640) 
cap.set(4, 480) 

print("System Active. Press Ctrl+C to shut down safely...")

# --- STEP 4 & 5: Main Loop & Graceful Shutdown ---

try:
    while True:
        success, img = cap.read()
        if not success:
            break

        class_ids, confs, bbox = net.detect(img, confThreshold=0.5)

        if len(class_ids) != 0:
            for class_id, confidence, box in zip(class_ids.flatten(), confs.flatten(), bbox):
                label = class_names[class_id - 1]
                
                if SHOW_WINDOW:
                    cv2.rectangle(img, box, color=(0, 255, 0), thickness=2)
                    cv2.putText(img, label.upper(), (box[0] + 10, box[1] + 30),
                                cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

                say_async(label)

        if SHOW_WINDOW:
            cv2.imshow("Vision Assist", img)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

except KeyboardInterrupt:
    print("\n[INFO] Safe shutdown triggered...")

finally:
    # CLEANUP: Crucial to prevent "Device Busy" or hanging threads
    cap.release()
    if SHOW_WINDOW:
        cv2.destroyAllWindows()
    
    # Signal the speech thread to close
    speech_q.put(None) 
    print("[SUCCESS] Resources released. No hanging processes.")