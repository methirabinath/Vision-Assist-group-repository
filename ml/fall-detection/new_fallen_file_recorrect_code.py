# Fall Detection System 
# Author : Sinethma Pathirage 

import time
import math

try:
    import smbus
    HARDWARE_AVAILABLE = True
except ModuleNotFoundError:
    HARDWARE_AVAILABLE = False
    print("⚠ SMBus not found – Running in simulation mode")


MPU_ADDR = 0x68
PWR_MGMT_1 = 0x6B
ACCEL_XOUT_H = 0x3B
GYRO_XOUT_H = 0x43

if HARDWARE_AVAILABLE:
    bus = smbus.SMBus(1)
    bus.write_byte_data(MPU_ADDR, PWR_MGMT_1, 0)

def read_raw_data(addr):
    if not HARDWARE_AVAILABLE:
        return 0

    high = bus.read_byte_data(MPU_ADDR, addr)
    low = bus.read_byte_data(MPU_ADDR, addr + 1)
    value = (high << 8) | low

    if value > 32768:
        value -= 65536

    return value
def get_acceleration():
    ax = read_raw_data(ACCEL_XOUT_H) / 16384.0
    ay = read_raw_data(ACCEL_XOUT_H + 2) / 16384.0
    az = read_raw_data(ACCEL_XOUT_H + 4) / 16384.0

    if not HARDWARE_AVAILABLE:
        ax, ay, az = 0.0, 0.0, 1.0

    return ax, ay, az

def get_gyroscope():
    gx = read_raw_data(GYRO_XOUT_H) / 131.0
    gy = read_raw_data(GYRO_XOUT_H + 2) / 131.0
    gz = read_raw_data(GYRO_XOUT_H + 4) / 131.0

    return gx, gy, gz

def calculate_tilt(ax, ay, az):
    roll = math.atan2(ay, az) * 57.3
    pitch = math.atan2(-ax, math.sqrt(ay * ay + az * az)) * 57.3
    return roll, pitch

IMPACT_THRESHOLD = 2.5
TILT_THRESHOLD = 45
INACTIVITY_TIME = 2.5
RESET_TIME = 5

impact_time = None
fall_state = False