import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Animated, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SOSAlertScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [isPressed, setIsPressed] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Handle SOS button press with animation and confirmation
    const handleSOSPress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        Alert.alert(
            "⚠️ Emergency Confirmation",
            "This will send an SOS alert with your location to emergency contacts and monitoring system.\n\nAre you sure you want to proceed?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => setIsPressed(false)
                },
                {
                    text: "Send SOS",
                    style: "destructive",
                    onPress: () => {
                        console.log("SOS Sent");
                        setIsPressed(false);
                        // Navigate or show success
                    }
                }
            ]
        );
    };

    return (
        <View className="flex-1 bg-gradient-to-b from-white to-red-50">
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View className="pt-16 px-6">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md"
                >
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="flex-1 justify-center items-center px-6">

                {/* Logo/Brand */}
                <View className="mb-8">
                    <Text className="text-center text-xl font-bold text-gray-800 mb-2">
                        Vision<Text className="text-gray-600">Assist</Text>
                    </Text>
                    <View className="bg-red-100 px-4 py-1 rounded-full">
                        <Text className="text-red-600 text-xs font-bold tracking-wider">
                            EMERGENCY MODE
                        </Text>
                    </View>
                </View>

                {/* Warning Badge */}
                <View className="w-28 h-28 bg-red-50 border-4 border-red-100 rounded-full items-center justify-center mb-6 shadow-lg">
                    <Ionicons name="warning" size={60} color="#ef4444" />
                </View>

                <Text className="text-3xl font-bold text-gray-900 mb-3 text-center">
                    Emergency Alert
                </Text>

                <Text className="text-gray-600 text-center text-base mb-3 max-w-sm leading-6">
                    Press the button below to immediately send an emergency alert
                </Text>

                {/* Alert Info Cards */}
                <View className="bg-white rounded-2xl p-4 mb-8 shadow-md w-full max-w-sm">
                    <View className="flex-row items-center mb-3 pb-3 border-b border-gray-100">
                        <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-3">
                            <Ionicons name="location" size={20} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-semibold text-sm">Live Location</Text>
                            <Text className="text-gray-500 text-xs">Shared with emergency contacts</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center mb-3 pb-3 border-b border-gray-100">
                        <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mr-3">
                            <Ionicons name="people" size={20} color="#22c55e" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-semibold text-sm">Emergency Contacts</Text>
                            <Text className="text-gray-500 text-xs">Notified instantly</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-purple-50 rounded-full items-center justify-center mr-3">
                            <Ionicons name="shield-checkmark" size={20} color="#a855f7" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-semibold text-sm">Monitoring System</Text>
                            <Text className="text-gray-500 text-xs">24/7 support activated</Text>
                        </View>
                    </View>
                </View>

                {/* SOS Button */}
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        onPress={handleSOSPress}
                        onPressIn={() => setIsPressed(true)}
                        onPressOut={() => setIsPressed(false)}
                        activeOpacity={0.9}
                        className={`w-52 h-52 bg-red-600 rounded-full items-center justify-center shadow-2xl ${isPressed ? 'opacity-90' : ''}`}
                        style={{
                            shadowColor: '#ef4444',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.5,
                            shadowRadius: 16,
                            elevation: 10,
                        }}
                    >
                        <View className="w-44 h-44 bg-red-500 rounded-full items-center justify-center border-4 border-red-400">
                            <Ionicons name="warning" size={50} color="#ffffff" />
                            <Text className="text-white text-3xl font-bold mt-3">SOS</Text>
                            <Text className="text-red-100 text-sm mt-1">Emergency Alert</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                <Text className="text-gray-400 text-sm mt-8 text-center">
                    Tap and hold to send alert
                </Text>

            </View>

            {/* Footer */}
            <View
                className="px-6"
                style={{
                    paddingBottom: insets.bottom + 20
                }}
            >
                <View className="bg-gray-50 rounded-2xl p-4">
                    <View className="flex-row items-center justify-center">
                        <Ionicons name="shield-checkmark-outline" size={20} color="#6b7280" />
                        <Text className="text-gray-600 text-xs ml-2 font-semibold">
                            VisionAssist Emergency System • Available 24/7
                        </Text>
                    </View>
                </View>
            </View>

        </View>
    );
}