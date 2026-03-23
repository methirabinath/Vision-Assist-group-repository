import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { getHatStatus } from "../services/hatApi";
import { startBlindUserTracking, startFallMonitoring, stopBlindUserTracking, stopFallMonitoring } from '../services/locationSender';

const NAVIGATION_API_URL = "http://192.168.1.5:5000/navigate";
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const WAKE_WORD = "hello";

const CURRENT_LAT = 7.2083;
const CURRENT_LON = 79.8358;

export default function VoiceOpen() {

    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [recording, setRecording] = useState<any>(null);

    //tracking init and cleanup
    useEffect(() => {
        const initTracking = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (!token) return;

                const decoded: any = jwtDecode(token);
                const userId = decoded?.id;

                if (!userId) return;

                await startBlindUserTracking(userId);
                startFallMonitoring(userId);

            } catch (error) {
                console.log("Tracking init error:", error);
            }
        };

        initTracking();

        return () => {
            stopBlindUserTracking();
            stopFallMonitoring();
        };
    }, []);


    // speak function
    const speak = (text: string) => {
        Speech.stop();
        Speech.speak(text);
    };

    //logout function
    const handleLogout = async () => {
        await AsyncStorage.clear();
        router.replace("/welcomeScreen");
    };

    // extract destination from text
    const extractDestination = (text: string) => {
        const patterns = [
            /take me to\s+(.+)/i,
            /go to\s+(.+)/i,
            /navigate to\s+(.+)/i,
            /guide me to\s+(.+)/i,
        ];
        for (const p of patterns) {
            const m = text.match(p);
            if (m) return m[1].trim();
        }
        return null;
    };

    // send destination to navigation API
    const sendToNavigation = async (destination: string) => {
        try {
            const res = await fetch(NAVIGATION_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    destination,
                    current_lat: CURRENT_LAT,
                    current_lon: CURRENT_LON
                })
            });
            return await res.json();
        } catch (e) {
            console.log("Navigation error:", e);
            return null;
        }
    };


    // transcribe audio using OpenAI Whisper
    const transcribeAudio = async (uri: string) => {
        try {
            console.log("Audio URI:", uri);

            const formData = new FormData();

            formData.append("file", {
                uri: uri,
                name: "recording.m4a",
                type: "audio/x-m4a", // 🔥 FIXED
            } as any);

            formData.append("model", "whisper-1");

            const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: formData
            });

            const data = await res.json();

            console.log("Whisper response:", data);

            if (!res.ok) {
                console.log("Whisper error:", data);
                return "";
            }

            return data.text?.toLowerCase() || "";

        } catch (e) {
            console.log("Transcription error:", e);
            return "";
        }
    };


    // toggle listening (start/stop recording)
    const toggleListening = async () => {
        try {
            if (isListening && recording) {

                // 🔥 ensure minimum recording time
                await new Promise(res => setTimeout(res, 1500));

                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();

                console.log("Recorded file:", uri);

                setRecording(null);
                setIsListening(false);

                if (uri) await handleVoiceCommand(uri);

            } else {

                await Audio.requestPermissionsAsync();

                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const rec = new Audio.Recording();

                await rec.prepareToRecordAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                await rec.startAsync();

                setRecording(rec);
                setIsListening(true);
            }

        } catch (e) {
            console.log("Recording error:", e);
        }
    };


    // handle voice command
    const handleVoiceCommand = async (uri: string) => {

        const text = await transcribeAudio(uri);

        if (!text) {
            speak("Sorry, I didn't catch that.");
            return;
        }

        console.log("User said:", text);

        const destination = extractDestination(text);

        if (text.includes(WAKE_WORD) || destination) {

            if (!destination) {
                speak("Please tell me where to go.");
                return;
            }

            speak(`Navigating to ${destination}`);

            const nav = await sendToNavigation(destination);

            if (nav?.status === "success") {

                speak(`Distance ${Math.round(nav.distance_meters)} meters`);
                speak(`Time ${Math.round(nav.duration_seconds / 60)} minutes`);

                for (const step of nav.instructions || []) {
                    speak(step);
                }

            } else {
                speak("Route not found.");
            }
        }
    };


    // check fall status (for testing)
    const checkFallStatus = async () => {
        const data = await getHatStatus();
        if (!data) return Alert.alert("Error", "Cannot reach device");

        Alert.alert(
            data.fall ? "⚠ Fall Detected" : "Safe",
            data.fall ? "User has fallen" : "No fall detected"
        );
    };


    // UI
    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            <View className="bg-white pt-14 pb-5 px-6 border-b border-slate-100">
                <View className="flex-row justify-between items-center">

                    {/* Hamburger */}
                    <TouchableOpacity
                        onPress={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
                    >
                        <Ionicons
                            name={menuOpen ? "close" : "menu"}
                            size={22}
                            color="#475569"
                        />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold">
                        Vision<Text className="text-blue-500">Assist</Text>
                    </Text>

                    <View className="w-10" />
                </View>
            </View>

            {/* Dropdown Menu */}
            {menuOpen && (
                <View className="absolute top-28 left-6 right-6 bg-white border border-slate-200 rounded-2xl shadow-lg z-50">

                    {/* View QR */}
                    <TouchableOpacity
                        onPress={() => {
                            setMenuOpen(false);
                            router.push("/qrPage");
                        }}
                        className="py-4 px-5 flex-row items-center"
                    >
                        <Ionicons
                            name="qr-code-outline"
                            size={18}
                            color="#2563eb"
                            style={{ marginRight: 10 }}
                        />
                        <Text className="font-semibold text-slate-800">
                            View QR Code
                        </Text>
                    </TouchableOpacity>

                    <View className="h-px bg-slate-100 mx-5" />

                    {/* Logout */}
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="py-4 px-5 flex-row items-center"
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={18}
                            color="#dc2626"
                            style={{ marginRight: 10 }}
                        />
                        <Text className="font-semibold text-red-600">
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            )}

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