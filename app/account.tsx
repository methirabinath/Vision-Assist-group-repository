import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from '../config';


interface User {
    fullName?: string;
    role?: string;
    email?: string;
    phone?: string;
    createdAt?: string;
}
export default function UserProfile() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    const fetchUserProfile = async () => {
        try {

            // Check AsyncStorage for token
            const token = await AsyncStorage.getItem("authToken");

            console.log("🔍 Token found:", token ? "YES" : "NO");
            console.log("Sending Token:", token);

            const response = await fetch(`${BASE_URL}/api/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("API Error:", data.message);
                return;
            }

            console.log("✅ Profile loaded:", data.user.role);
            setUser(data.user);

        } catch (error) {
            console.log("Profile fetch error:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Handle loading and error states
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <Text>Loading profile...</Text>
            </View>
        );
    }

    // If user data is not available, show an error message
    if (!user) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <Text>Profile not found</Text>
            </View>
        );
    }


    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* Top Section*/}
            <View className="items-center pt-16 pb-10">


                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                    Your Profile
                </Text>

                <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                    Vision<Text className="text-blue-500">Assist</Text>
                </Text>

                <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />

                <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                    Smart Vision. Smart Living.
                </Text>

            </View>

            {/* Content Card */}
            <ScrollView
                className="flex-1 bg-white rounded-t-3xl px-8 pt-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 100
                }}
            >

                {/* Profile Photo & Name */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <Image
                            source={{ uri: "https://www.freeiconspng.com/uploads/account-icon-5.jpg" }}
                            className="w-24 h-24 rounded-2xl bg-slate-100"
                        />
                        <View className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 border-4 border-white rounded-full" />
                    </View>
                    <Text className="text-slate-900 text-2xl font-bold tracking-tight mt-4">
                        {user?.fullName}
                    </Text>
                    <View className="bg-blue-50 px-3 py-1 rounded-xl mt-2">
                        <Text className="text-blue-500 text-xs font-bold uppercase tracking-widest">
                            {user?.role}
                        </Text>
                    </View>
                </View>

                {/* Account Info */}
                <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-3">
                    Account Information
                </Text>

                <View className="border border-slate-100 rounded-2xl mb-6 overflow-hidden">

                    <View className="flex-row items-center px-5 py-4 bg-slate-50">
                        <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="mail-outline" size={18} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-0.5">
                                Email
                            </Text>
                            <Text className="text-slate-900 text-sm font-semibold">
                                {user?.email}
                            </Text>
                        </View>
                    </View>

                    <View className="h-px bg-slate-100" />

                    <View className="flex-row items-center px-5 py-4 bg-slate-50">
                        <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="call-outline" size={18} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-0.5">
                                Phone
                            </Text>
                            <Text className="text-slate-900 text-sm font-semibold">
                                {user?.phone}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Device Info */}
                <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-3">
                    Linked Device
                </Text>

                <View className="border border-slate-100 rounded-2xl mb-6 overflow-hidden">

                    <View className="flex-row items-center px-5 py-4 bg-slate-50">
                        <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="hardware-chip-outline" size={18} color="#3b82f6" />
                        </View>
                        <View className="flex-row items-center gap-x-1.5">
                            <View className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <Text className="text-green-500 text-xs font-semibold">Live</Text>
                        </View>
                    </View>

                    <View className="h-px bg-slate-100" />

                    <View className="flex-row items-center px-5 py-4 bg-slate-50">
                        <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="calendar-outline" size={18} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-0.5">
                                Account Created
                            </Text>
                            <Text className="text-slate-900 text-sm font-semibold">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Caregiver Tips */}
                <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-3">
                    Caregiver Tips
                </Text>

                <View className="border border-blue-100 rounded-2xl p-5 mb-6 bg-blue-50">
                    <View className="flex-row items-start mb-3">
                        <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center mr-3 mt-0.5">
                            <Ionicons name="checkmark" size={14} color="#ffffff" />
                        </View>
                        <Text className="text-slate-600 text-sm flex-1 leading-6">
                            Check alerts daily to stay informed about your loved one's safety.
                        </Text>
                    </View>
                    <View className="flex-row items-start mb-3">
                        <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center mr-3 mt-0.5">
                            <Ionicons name="checkmark" size={14} color="#ffffff" />
                        </View>
                        <Text className="text-slate-600 text-sm flex-1 leading-6">
                            Ensure the device battery stays above 20% for uninterrupted monitoring.
                        </Text>
                    </View>
                    <View className="flex-row items-start">
                        <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center mr-3 mt-0.5">
                            <Ionicons name="checkmark" size={14} color="#ffffff" />
                        </View>
                        <Text className="text-slate-600 text-sm flex-1 leading-6">
                            Test the emergency SOS feature regularly to ensure it works when needed.
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}