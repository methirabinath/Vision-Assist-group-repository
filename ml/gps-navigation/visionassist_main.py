import pyttsx3
import time

engine = pyttsx3.init()

def alert(msg):
    print(msg)
    engine.say(msg)
    engine.runAndWait()



    import pyttsx3
import time
import winsound   # For beep sound (Windows only)

engine = pyttsx3.init()

# Optional: Change voice speed
engine.setProperty('rate', 150)

def alert(msg):
    print("ALERT:", msg)
    
    # Beep sound before speaking
    winsound.Beep(1000, 500)  # Frequency 1000Hz for 0.5 seconds
    
    engine.say(msg)
    engine.runAndWait()

def repeat_alert(msg, times=2, delay=1):
    for i in range(times):
        alert(msg)
        time.sleep(delay)

# Example usage
if __name__ == "__main__":
    repeat_alert("GPS navigation system activated", 2)















