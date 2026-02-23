import queue
import json
import sounddevice as sd
import pyttsx3
from vosk import Model, KaldiRecognizer

# -----------------------------
# TTS SETUP
# -----------------------------
engine = pyttsx3.init()
engine.setProperty('rate', 170)
engine.setProperty('volume', 1.0)

def speak(text):
    print("SPEAK:", text)
    engine.say(text)
    engine.runAndWait()

# -----------------------------
# VOSK SETUP
# -----------------------------
MODEL_PATH = "vosk-model-small-en-us-0.15"

model = Model(MODEL_PATH)
rec = KaldiRecognizer(model, 16000)

audio_q = queue.Queue()

def callback(indata, frames, time, status):
    if status:
        print(status)
    audio_q.put(bytes(indata))

# -----------------------------
# COMMAND HANDLER
# -----------------------------
def handle_command(text):

    print("COMMAND:", text)

    if "help" in text:
        speak("Emergency alert activated")

    elif "guide" in text or "navigate" in text or "home" in text:
        speak("Starting navigation")

    elif "stop" in text:
        speak("Stopping navigation")

    elif "To where" in text:
        speak("Back to location")

    elif "where am i" in text or "location" in text:
        speak("Getting your location")

    elif "hello" in text:
        speak("Hello, I am vision assist")

    else:
        print("No valid command")

# -----------------------------
# MAIN
# -----------------------------
def main():

    speak("Voice system ready. Please speak.")

    with sd.RawInputStream(
        samplerate=16000,
        blocksize=8000,
        dtype="int16",
        channels=1,
        callback=callback
    ):
        print("Listening... Press CTRL+C to stop")

        while True:
            data = audio_q.get()

            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                text = result.get("text", "").lower()

                if text != "":
                    print("Heard:", text)
                    handle_command(text)

# -----------------------------
if __name__ == "__main__":
    main()



    
