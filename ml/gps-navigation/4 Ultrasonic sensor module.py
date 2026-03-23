import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

# Define TRIG and ECHO pins for 4 sensors
sensors = [
    {"TRIG": 23, "ECHO": 24},
    {"TRIG": 17, "ECHO": 27},
    {"TRIG": 5,  "ECHO": 6},
    {"TRIG": 13, "ECHO": 19}
]

# Setup all sensors
for sensor in sensors:
    GPIO.setup(sensor["TRIG"], GPIO.OUT)
    GPIO.setup(sensor["ECHO"], GPIO.IN)

def get_distance(TRIG, ECHO):
    # Send trigger pulse
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    pulse_start = time.time()
    pulse_end = time.time()

    # Wait for echo start
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()

    # Wait for echo end
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()

    duration = pulse_end - pulse_start
    distance = duration * 17150
    return round(distance, 2)

try:
    while True:
        for i, sensor in enumerate(sensors):
            dist = get_distance(sensor["TRIG"], sensor["ECHO"])
            print(f"Sensor {i+1}: {dist} cm")
        
        print("---------------------")
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()