import cv2
import pyttsx3
import threading
import queue

# --- TEP 3: Non-blocking Speech Setup ---
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

# Start the background speech thread
threading.Thread(target=speech_worker, daemon=True).start()

def say_async(text):
    if not speech_q.full():
        speech_q.put_nowait(text)
# ---------------------------------------

def main():
    # Replace with your specific model/camera setup
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # --- Placeholder for your Detection Logic ---
        # Example: label = detector.detect(frame)
        label = "Object Detected" 
        
        # TEP 3: Trigger speech without blocking the video feed
        if label:
            say_async(label)

        cv2.imshow('Detection Overlay', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()