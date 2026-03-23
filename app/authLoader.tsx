// app/authLoader.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthLoader() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const role = await AsyncStorage.getItem("userRole");

            if (token && role) {
                // Navigate automatically based on role
                if (role === "blindUser") router.replace("/openVoice");
                else router.replace("/home");
            } else {
                router.replace("/login");
            }
        };

        checkAuth();
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-slate-50">
            <ActivityIndicator size="large" color="#2563eb" />
        </View>
    );
}