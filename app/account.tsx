import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function UserProfile() {
    const router = useRouter();

    // Placeholder user data
    const user = {
        fullName: "Senindu Jayasinghe",
        email: "senindu@visionassist.com",
        phone: "+94 70 345 6789",
        role: "Caregiver",
        photo: "",
        deviceId: "#VAH-1023",
        linkedSince: "January 2025",
    };

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* Top Section*/}
            <View className="items-center pt-16 pb-10">

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-6 top-4 w-10 h-10 rounded-full border border-slate-200 bg-white items-center justify-center"
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={18} color="#475569" />
                </TouchableOpacity>

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
            >

                {/* Profile Photo & Name */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <Image
                            source={{ uri: user.photo || "https://www.gravatar.com/avatar/?d=mp&s=200" }}
                            className="w-24 h-24 rounded-2xl bg-slate-100"
                        />
                        <View className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 border-4 border-white rounded-full" />
                    </View>
                    <Text className="text-slate-900 text-2xl font-bold tracking-tight mt-4">
                        {user.fullName}
                    </Text>
                    <View className="bg-blue-50 px-3 py-1 rounded-xl mt-2">
                        <Text className="text-blue-500 text-xs font-bold uppercase tracking-widest">
                            {user.role}
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
                                {user.email}
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
                                {user.phone}
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
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-0.5">
                                Device ID
                            </Text>
                            <Text className="text-slate-900 text-sm font-bold">
                                {user.deviceId}
                            </Text>
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
                                Linked Since
                            </Text>
                            <Text className="text-slate-900 text-sm font-semibold">
                                {user.linkedSince}
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

                {/* Action Buttons */}
                <TouchableOpacity
                    className="bg-blue-500 rounded-2xl py-4 items-center mb-3"
                    activeOpacity={0.8}
                >
                    <View className="flex-row items-center gap-x-2">
                        <Ionicons name="pencil" size={16} color="#ffffff" />
                        <Text className="text-white font-bold tracking-widest uppercase text-sm">
                            Edit Profile
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
}