import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function VoiceOpen() {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* Top Section: Logo */}
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
                    Voice Assistant
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
            <View className="flex-1 bg-white rounded-t-3xl px-8 pt-10">

                {/* Page Title */}
                <Text className="text-slate-900 text-2xl font-bold tracking-tight mb-1">
                    Voice Bridge
                </Text>
                <View className="w-8 h-0.5 bg-blue-500 mb-2" />
                <Text className="text-slate-400 text-sm leading-6 mb-8">
                    Tap the microphone to speak your command. Your device will respond instantly.
                </Text>

                {/* Voice Interface */}
                <View className="flex-1 items-center justify-center">

                    {/* Microphone Button */}
                    <TouchableOpacity
                        onPress={() => setIsListening(!isListening)}
                        activeOpacity={0.85}
                        className={`w-32 h-32 rounded-full items-center justify-center mb-8 ${isListening ? 'bg-blue-500' : 'bg-blue-50 border-2 border-blue-200'
                            }`}
                    >
                        <Ionicons
                            name={isListening ? "mic" : "mic-outline"}
                            size={56}
                            color={isListening ? "#ffffff" : "#3b82f6"}
                        />
                    </TouchableOpacity>

                </View>


                {/* Quick Commands */}
                <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-3">
                    Quick Commands
                </Text>

                <View className="flex-row flex-wrap gap-2 mb-10">
                    {['Navigate home', 'Call emergency', 'Check battery', 'Where am I'].map((cmd) => (
                        <TouchableOpacity
                            key={cmd}
                            className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2"
                            activeOpacity={0.7}
                        >
                            <Text className="text-blue-500 text-xs font-semibold">
                                {cmd}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>

        </View>
    );
}