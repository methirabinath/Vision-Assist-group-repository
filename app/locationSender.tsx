import * as Location from "expo-location";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

let trackingInterval: ReturnType<typeof setInterval> | null = null;

// Start Blind User Location Tracking

export async function startBlindUserTracking(userId: string) {

    if (!userId) {
        console.log("Tracking failed: userId missing");
        return;
    }

    // Ask permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        alert("Location permission required");
        return;
    }

    // Clear previous interval if exists
    if (trackingInterval) {
        clearInterval(trackingInterval);
    }

    console.log("Tracking started ✅");

    trackingInterval = setInterval(async () => {

        try {

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

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
}

// Stop Blind User Location Tracking

export function stopBlindUserTracking() {

    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
        console.log("Tracking stopped ✅");
    }
}