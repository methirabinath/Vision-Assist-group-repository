import pyttsx3
import time

engine = pyttsx3.init()

def alert(msg):
    print(msg)
    engine.say(msg)
    engine.runAndWait()

while True:
    # Simulated values (replace with real sensor readings)
    head = 80
    chest = 120
    ground = 60

    if head < 100:
        alert("Obstacle at head level")

    if chest < 100:
        alert("Obstacle at chest level")

    if ground < 80:
        alert("Obstacle on ground")

    time.sleep(2)
