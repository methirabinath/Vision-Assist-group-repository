import time
import math
import smbus
import requests

# MPU6050 registers
MPU_ADDR = 0x68
PWR_MGMT_1 = 0x6B
ACCEL_XOUT_H = 0x3B
GYRO_XOUT_H = 0x43

bus = smbus.SMBus(1)

# wake up sensor
bus.write_byte_data(MPU_ADDR, PWR_MGMT_1, 0)

# fall detection thresholds
IMPACT_THRESHOLD = 2.5
TILT_THRESHOLD = 45
INACTIVITY_TIME = 2.5
RESET_TIME = 5

impact_time = None
fall_state = False

print("IMU Fall Detection Started")


def read_raw(addr):
    high = bus.read_byte_data(MPU_ADDR, addr)
    low = bus.read_byte_data(MPU_ADDR, addr + 1)

    value = (high << 8) | low

    if value > 32768:
        value -= 65536

    return value


def get_accel():
    ax = read_raw(ACCEL_XOUT_H) / 16384.0
    ay = read_raw(ACCEL_XOUT_H + 2) / 16384.0
    az = read_raw(ACCEL_XOUT_H + 4) / 16384.0

    return ax, ay, az


def calculate_tilt(ax, ay, az):
    roll = math.atan2(ay, az) * 57.3
    pitch = math.atan2(-ax, math.sqrt(ay * ay + az * az)) * 57.3
    return roll, pitch


while True:

    ax, ay, az = get_accel()

    acc_mag = math.sqrt(ax * ax + ay * ay + az * az)

    roll, pitch = calculate_tilt(ax, ay, az)

    print(
        f"Acc:{acc_mag:.2f}g | "
        f"Roll:{roll:.1f}° | "
        f"Pitch:{pitch:.1f}°"
    )

    # impact detection
    if acc_mag > IMPACT_THRESHOLD and not fall_state:
        impact_time = time.time()
        fall_state = True
        print("⚠ Impact detected")

    if fall_state and impact_time is not None:

        elapsed = time.time() - impact_time

        if elapsed > INACTIVITY_TIME and abs(pitch) > TILT_THRESHOLD:

            print("🚨 FALL CONFIRMED!")

            # notify server
            try:
                requests.get("http://10.42.0.1:5000/fall", timeout=0.2)
            except:
                pass

            fall_state = False
            impact_time = None

        elif elapsed > RESET_TIME:
            fall_state = False
            impact_time = None

    time.sleep(0.2)