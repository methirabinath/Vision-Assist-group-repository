from WakeWordDetector import WakeWordDetector
from listenCommand import SpeechToText
from TextToSpeech import TextToSpeech
from VoiceCommandProcessor import VoiceCommandProcessor
from Obstacle import ObstacleAudioFeedback

import random
import time

wake = WakeWordDetector()
stt = SpeechToText()
tts = TextToSpeech()
cmd_processor = VoiceCommandProcessor()
obstacle_feedback = ObstacleAudioFeedback()

while True:

    # Simulated obstacle detection (replace with real sensor input)
    fake_distance = random.randint(20, 150)
    fake_level = random.choice(["head", "chest", "ground"])

    obstacle_alert = obstacle_feedback.check_obstacle(fake_distance, fake_level)

    if obstacle_alert:
        tts.speak(obstacle_alert)

    # Wake word detection
    if wake.listen():

        wake = WakeWordDetector()  # Reinitialize to reset audio stream
        wake.listen()
        
        command = stt.listen_command()
        response = cmd_processor.process(command)
        tts.speak(response)

    time.sleep(2)
