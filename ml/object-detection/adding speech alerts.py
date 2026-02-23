import pyttsx3
import time

engine = pyttsx3.init(driverName="espeak")
engine.setProperty("rate", 160)

def speak_non_blocking(text):