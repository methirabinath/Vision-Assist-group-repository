class VoiceCommandProcessor:

    def process(self, command):
        if "guide me home" in command:
            return "Starting navigation to home."

        elif "where am i" in command:
            return "Fetching your current location."

        elif "stop navigation" in command:
            return "Navigation stopped."

        elif "battery level" in command:
            return "Battery is at 70 percent."

        else:
            return "Command not recognized."
