import pvporcupine
import pyaudio
import struct

class WakeWordDetector:
    def __init__(self):
        self.porcupine = pvporcupine.create(
            access_key="+NBT+f4Dtdb+I8byold/M9VOSIiIr4IjcTDd+7B/3AjHcH7Mmz3RRA==",
            keywords=["computer"]  # Replace with custom "Hey Vision" model if trained
        )

        self.pa = pyaudio.PyAudio()
        self.audio_stream = self.pa.open(
            rate=self.porcupine.sample_rate,
            channels=1,
            format=pyaudio.paInt16,
            input=True,
            frames_per_buffer=self.porcupine.frame_length
        )


    #Adding a stop method to close the audio stream and terminate PyAudio when done

    def stop(self):
        self.audio_stream.close()
        self.pa.terminate()
        
    def stop(self):
        self.audio_stream.close()
        self.pa.terminate()

    def listen(self):
        print("Listening for wake word...")

        while True:
            pcm = self.audio_stream.read(self.porcupine.frame_length)
            pcm = struct.unpack_from("h" * self.porcupine.frame_length, pcm)

            result = self.porcupine.process(pcm)

            if result >= 0:
                print("Wake word detected!")

                #Close mic before returning
                self.audio_stream.close()
                self.pa.terminate()

                return True
