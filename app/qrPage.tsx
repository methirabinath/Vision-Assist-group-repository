import { BASE_URL } from "@/config";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QRPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State to hold family group ID and loading status
    const [familyId, setFamilyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile on mount to get family group ID
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Fetch user profile 
    const fetchUserProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) return;

            //
            const response = await fetch(`${BASE_URL}/api/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) return;

            if (data.user?.familyGroupId) {
                setFamilyId(data.user.familyGroupId);
            }

        } catch (error) {
            console.log("Profile fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Show loading state while fetching profile
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <View className="bg-blue-500 w-16 h-16 rounded-2xl items-center justify-center mb-4">
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
                <Text className="text-slate-600 font-semibold">Loading QR Code...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            {/* Header */}
            <View className="bg-white border-b border-slate-200/50 px-6 py-5 shadow-sm">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-11 h-11 rounded-2xl border border-slate-200 bg-white items-center justify-center shadow-sm"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={22} color="#475569" />
                    </TouchableOpacity>

                    <View className="ml-4 flex-1">
                        <Text className="text-xl font-bold text-slate-900">Family QR Code</Text>
                        <Text className="text-xs text-slate-400 mt-0.5">Connect with caregivers</Text>
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <View className="flex-1 justify-center items-center px-6">

                {/* Info Card */}
                <View className="bg-white border border-slate-200/80 rounded-3xl p-6 mb-8 shadow-lg w-full">

                    <View className="h-px bg-slate-100 mb-4" />

                    <Text className="text-slate-600 text-sm leading-6">
                        Show this QR code to your caregiver to establish a secure connection.
                    </Text>
                </View>

                {/* QR Code Container */}
                {familyId ? (
                    <View className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl">
                        <View className="bg-slate-50 p-6 rounded-2xl">
                            <QRCode
                                value={familyId}
                                size={240}
                                backgroundColor="transparent"
                                color="#1e293b"
                            />
                        </View>

                        {/* Family ID Display */}
                        <View className="mt-6 bg-slate-50 rounded-2xl p-4">
                            <Text className="text-slate-400 text-xs font-semibold uppercase text-center mb-1">
                                Family Group ID
                            </Text>
                            <Text className="text-slate-900 text-base font-bold text-center">
                                {familyId}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View className="bg-red-50 border border-red-200 rounded-3xl p-8 w-full">
                        <View className="items-center">
                            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
                                <Ionicons name="alert-circle" size={32} color="#ef4444" />
                            </View>
                            <Text className="text-red-900 text-lg font-bold mb-2">
                                No Family Group Found
                            </Text>
                            <Text className="text-red-600 text-sm text-center">
                                Please create or join a family group first.
                            </Text>
                        </View>
                    </View>
                )}

                {/* Instructions */}
                <View className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 w-full">
                    <View className="flex-row items-start">
                        <Ionicons name="information-circle" size={24} color="#3b82f6" />
                        <View className="ml-3 flex-1">
                            <Text className="text-blue-900 font-bold text-sm mb-2">
                                How to Connect
                            </Text>
                            <Text className="text-blue-700 text-xs leading-5">
                                1. Open VisionAssist on caregiver's device{'\n'}
                                2. Tap "Scan QR Code"{'\n'}
                                3. Point camera at this code{'\n'}
                                4. Connection will establish automatically
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
}