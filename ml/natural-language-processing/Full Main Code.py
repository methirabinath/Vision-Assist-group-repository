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

def extract_destination(text):
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
    
    return None


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
                    
                    destination = extract_destination(text)
                    
                    if destination:
                        speak(f"Starting navigation to {destination}")
                        
                        nav_response = send_to_navigation(destination)
                        
                        if nav_response:
                            speak("Navigation request sent successfully.")
                        else:
                            speak("Unable to connect to navigation system.")
                    
                    else:
                        speak("Please say your destination clearly.")


# -----------------------------
# Run Program
# -----------------------------

if __name__ == "__main__":
    listen_for_command()
