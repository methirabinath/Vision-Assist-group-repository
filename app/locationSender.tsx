import * as Location from "expo-location";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { getHatStatus } from "../services/hatApi";

let trackingInterval: ReturnType<typeof setInterval> | null = null;
let fallInterval: ReturnType<typeof setInterval> | null = null;
let fallSent = false;

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

// Send fall alert to Firebase
export async function sendFallAlert(userId: string) {
    try {
        const data = await getHatStatus();
        if (!data) {
            console.log("Cannot reach the hat");
            return;
        }

        if (data.fall) {
            // Get latest location
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

            await set(ref(db, `fallAlerts/${userId}`), {
                fall: true,
                battery: data.battery,
                timestamp: Date.now(),
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            console.log("Fall alert sent ✅");
        }

        console.log(data);

    } catch (error) {
        console.log("Fall alert error:", error);
    }
}

// Start automatic fall monitoring
export function startFallMonitoring(userId: string) {
    if (fallInterval) clearInterval(fallInterval);

    fallInterval = setInterval(() => {
        sendFallAlert(userId);
    }, 5000); // check every 5 seconds
}

// Stop automatic fall monitoring
export function stopFallMonitoring() {
    if (fallInterval) {
        clearInterval(fallInterval);
        fallInterval = null;
        console.log("Fall monitoring stopped ✅");
    }
}