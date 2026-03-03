import queue
import sounddevice as sd
import json
import vosk
import pyttsx3
import requests
import re
import sys
import os

# -----------------------------
# Configuration
# -----------------------------

MODEL_PATH = "vosk-model-small-en-us-0.15/vosk-model-small-en-us-0.15"
SAMPLE_RATE = 16000
WAKE_WORD = "hello"

is_awake = False

# Replace with your teammate's navigation API endpoint
NAVIGATION_API_URL = "http://localhost:5000/navigate"


# -----------------------------
# Initialize Text-to-Speech
# -----------------------------

engine = pyttsx3.init()
engine.setProperty('rate', 150)

def speak(text):
    print("Assistant:", text)
    engine.say(text)
    engine.runAndWait()


# -----------------------------
# Load Vosk Model
# -----------------------------

if not os.path.exists(MODEL_PATH):
    print("Model not found. Check MODEL_PATH.")
    sys.exit(1)

model = vosk.Model(MODEL_PATH)
recognizer = vosk.KaldiRecognizer(model, SAMPLE_RATE)

q = queue.Queue()

def audio_callback(indata, frames, time, status):
    if status:
        print(status, file=sys.stderr)
    q.put(bytes(indata))


# -----------------------------
# Extract Destination
# -----------------------------

"""def extract_destination(text):
    patterns = [
        r"take me to (.+)",
        r"go to (.+)",
        r"navigate to (.+)",
        r"guide me to (.+)",
        r"bring me to (.+)"
    ]
    
    text = text.lower()
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1).strip()
    
    return None"""

import re

def extract_destination(text):
    # Added \b for word boundaries and made the phrases more flexible
    patterns = [
        r"take me to\s+(.+)",
        r"go to\s+(.+)",
        r"navigate to\s+(.+)",
        r"guide me to\s+(.+)",
        r"bring me to\s+(.+)"
    ]
    
    for pattern in patterns:
        # re.IGNORECASE handles 'Take' vs 'take' automatically
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            # Clean up punctuation like periods or question marks
            destination = match.group(1).strip().rstrip('.?!')
            return destination
    
    return None

# Test it
print(extract_destination("Navigate to 123 Main St.")) # Output: 123 Main St


# -----------------------------
# Send to Navigation API
# -----------------------------

def send_to_navigation(destination):
    try:
        response = requests.post(
            NAVIGATION_API_URL,
            json={"destination": destination}
        )
        return response.json()
    except Exception as e:
        print("Navigation API Error:", e)
        return None


# -----------------------------
# Main Voice Loop
# -----------------------------

def listen_for_command():
    global is_awake
    speak("Voice navigation system ready.")

    with sd.RawInputStream(
        samplerate=SAMPLE_RATE,
        blocksize=8000,
        dtype="int16",
        channels=1,
        callback=audio_callback
    ):
        print("Listening...")

        while True:
            data = q.get()
            if recognizer.AcceptWaveform(data):
                result = json.loads(recognizer.Result())
                text = result.get("text", "")
                
                if text:
                    print("User said:", text)


                    if not is_awake:
                        if WAKE_WORD in text.lower():
                            is_awake = True
                            speak("Yes, how can I assist you?")
                        continue  # Skip processing until wake word is detected

                    destination = extract_destination(text)
                    
                    if destination:
                        speak(f"Starting navigation to {destination}")
                        send_to_navigation(destination)
                        is_awake = False # Go back to sleep
                    
                    else:
                        speak("Please say your destination clearly.")
                        is_awake = False
                        #Asking for the destination again


# -----------------------------
# Run Program
# -----------------------------

if __name__ == "__main__":
    listen_for_command()
