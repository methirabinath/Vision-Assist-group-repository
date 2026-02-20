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
