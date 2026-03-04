import * as Location from "expo-location";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

let trackingInterval: ReturnType<typeof setInterval> | null = null;

// Start Blind User Location Tracking
export async function startBlindUserTracking(userId: string) {

    try {

        if (!userId) {
            console.log("Tracking failed: userId missing");
            return;
        }

        // Request permission safely
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            console.log("Location permission denied");
            return;
        }

        // Clear previous tracking interval
        if (trackingInterval) {
            clearInterval(trackingInterval);
            trackingInterval = null;
        }

        console.log("Tracking started ✅");

        trackingInterval = setInterval(async () => {

            try {

                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High
                });

                if (!location?.coords) return;

                await set(ref(db, `tracking/${userId}`), {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    timestamp: Date.now()
                });

                console.log("Firebase location updated ✅");

            } catch (error) {
                console.log("Tracking error:", error);
            }

        }, 5000);

    } catch (error) {
        console.log("Tracking init error:", error);
    }
}

// Stop Tracking
export function stopBlindUserTracking() {

    try {

        if (trackingInterval) {
            clearInterval(trackingInterval);
            trackingInterval = null;
            console.log("Tracking stopped ✅");
        }

    } catch (error) {
        console.log("Tracking stop error:", error);
    }
}