#!/bin/bash

# Go to project folder
cd /home/visionassist/vision_hat

# Create logs folder
mkdir -p logs

sleep 10

#start hotspot 
nmcli device wifi hotspot ifname wlan0 ssid VisionHat password 12345678 & 

# 1) YOLO + speech (must run inside assist_env)
# IMPORTANT: this uses the venv python directly (no "source" needed)
/home/visionassist/assist_env/bin/python /home/visionassist/vision_hat/Manupa1.py \
  >> /home/visionassist/vision_hat/logs/yolo.log 2>&1 &

# 2) Ultrasonic program (system python)
 /usr/bin/python3 /home/visionassist/vision_hat/methira_ultra.py \
  >> /home/visionassist/vision_hat/logs/ultra.log 2>&1 &

# 3) Fall detection program (system python)
/usr/bin/python3 /home/visionassist/vision_hat/SDGP_FALL_working.py \
  >> /home/visionassist/vision_hat/logs/fall.log 2>&1 &

# start server 
/home/visionassist/assist_env/bin/python /home/visionassist/vision_hat/hat_server.py & 

echo "Started all modules."
wait


