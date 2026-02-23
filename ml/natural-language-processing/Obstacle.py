class ObstacleAudioFeedback:

    def check_obstacle(self, distance, level):
        """
        level: head / chest / ground
        """

        if distance < 50:
            return f"Warning! {level} level obstacle very close."

        elif distance < 100:
            return f"{level} level obstacle ahead."

        else:
            return None
