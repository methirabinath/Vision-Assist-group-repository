import { BASE_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

export default function ScanQRPage() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const handleScan = async ({ data }: any) => {
        setScanned(true);
        setLoading(true);

        try {
            console.log("Scanned QR:", data);

            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("User not authenticated");

            const response = await fetch(`${BASE_URL}/api/users/connect`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    familyGroupId: data,
                }),
            });

            const text = await response.text();
            console.log("RAW RESPONSE:", text);

            const result = text ? JSON.parse(text) : {};

            if (!response.ok) {
                throw new Error(result.message || "Connection failed");
            }

            Alert.alert("Success", "Connected!");
            router.back();

        } catch (err: any) {
            Alert.alert("Error", err.message);
            setScanned(false);
        } finally {
            setLoading(false);
        }
    };

    if (!permission) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text>Requesting camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No camera permission</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                style={{ flex: 1 }}
                onBarcodeScanned={scanned ? undefined : handleScan}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />

            {loading && (
                <ActivityIndicator style={{ position: "absolute", top: 50, alignSelf: "center" }} />
            )}

            {scanned && !loading && (
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    style={{
                        position: "absolute",
                        bottom: 40,
                        alignSelf: "center",
                        backgroundColor: "blue",
                        padding: 12,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ color: "white" }}>Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}