import cv2
import pyttsx3
import threading
import queue

# --- TEP 3: Non-blocking Speech Setup ---
speech_q = queue.Queue(maxsize=5)

def speech_worker():
    # Initializing with espeak for Pi compatibility
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

# Start background speech thread
threading.Thread(target=speech_worker, daemon=True).start()

def say_async(text):
    if not speech_q.full():
        speech_q.put_nowait(text)

# --- Optimized Camera Initialization ---
# Using CAP_V4L2 for better Linux/Pi performance
cap = cv2.VideoCapture(0, cv2.CAP_V4L2)

try:
    # Minimize frame lag by reducing internal buffer
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
except Exception:
    pass

# Use MJPG hardware decoding to keep CPU usage low
cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*"MJPG"))

# (Existing Width/Height/FPS lines - adjust as needed for your specific cam)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
cap.set(cv2.CAP_PROP_FPS, 30)

def main():
    print("System active. Press 'q' to quit.")
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # --- Detection Block ---
        # Logic for object detection goes here. 
        # Example implementation:
        label = "Target Detected" # Replace with your actual logic
        
        if label:
            # TEP 3: Non-blocking call
            say_async(label)

        # UI Overlay
        cv2.putText(frame, f"Speech Queue: {speech_q.qsize()}", (10, 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.imshow('Pi Optimized Stream', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Clean up
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()