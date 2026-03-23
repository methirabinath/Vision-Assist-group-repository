import RPi.GPIO as GPIO
import time

VIB = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(VIB, GPIO.OUT)

def vibrate():
    GPIO.output(VIB, True)
    time.sleep(0.5)
    GPIO.output(VIB, False)

vibrate()
GPIO.cleanup()
