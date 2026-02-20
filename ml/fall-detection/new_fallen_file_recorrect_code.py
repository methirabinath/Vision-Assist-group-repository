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

