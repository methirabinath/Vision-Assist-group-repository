import { BASE_URL } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const fetchWithRetry = async (url: string, options: any, retries = 3) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                return response;
            } catch (err) {
                console.log(`Retry ${i + 1}...`);
                await delay(4000); // wait 4 seconds before retry
            }
        }
        throw new Error("Server not reachable");
    };

    //  Handle Login
    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Please fill all the fields");
            Alert.alert("Validation", "Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("Connecting to server... please wait ⏳");

            const response = await fetchWithRetry(
                `${BASE_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data?.token) {
                setErrorMessage(data?.message || "Invalid email or password");
                return;
            }

            await AsyncStorage.setItem("authToken", data.token.trim());
            await AsyncStorage.setItem("userRole", data.role);

            console.log("JWT Token Stored ✅");
            console.log("User Role:", data.role);

            // Navigate
            if (data.role === "blindUser") {
                router.replace("/openVoice");
            } else {
                router.replace("/home");
            }

        } catch (error) {
            console.error("Login Error:", error);

            setErrorMessage(
                "Cannot connect to server. Please wait a few seconds and try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (


        <View className="flex-1 bg-slate-50">

            <StatusBar barStyle="dark-content" />

            {/* Top Section: Logo */}
            <View className="items-center pt-20 pb-10">

                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                    Welcome Back
                </Text>

                <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                    Vision<Text className="text-blue-500">Assist</Text>
                </Text>

                <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />

                <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                    Smart Vision. Smart Living.
                </Text>

            </View>

            {/* Form Card */}
            <View className="flex-1 bg-white rounded-t-3xl px-8 pt-10">

                {/* Email */}
                <View className="mb-6">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-2">
                        Email
                    </Text>
                    <TextInput
                        className="border-b border-slate-200 py-3 text-slate-900 text-base"
                        placeholder="Enter your email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}
                <View className="mb-3">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-2">
                        Password
                    </Text>
                    <View className="flex-row items-center border-b border-slate-200">
                        <TextInput
                            className="flex-1 py-3 text-slate-900 text-base"
                            placeholder="Enter your password"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.6}>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity className="self-end mb-10" activeOpacity={0.6}>
                    <Text className="text-blue-500 text-sm font-semibold">
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                {/* Inline Error Message */}
                {errorMessage ? (
                    <View className="bg-red-100 border border-red-400 rounded-lg px-4 py-2 mb-4">
                        <Text className="text-red-700 text-center text-sm">{errorMessage}</Text>
                    </View>
                ) : null}

                {/* Sign In Button */}
                <TouchableOpacity
                    className="bg-blue-500 rounded-2xl py-4 items-center mb-6"
                    activeOpacity={0.8}
                    disabled={loading}
                    onPress={handleLogin}
                >
                    <Text className="text-white text-base font-bold tracking-widest uppercase">
                        Sign In
                    </Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View className="flex-row justify-center">
                    <Text className="text-slate-400 text-sm">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/register")} activeOpacity={0.6}>
                        <Text className="text-blue-500 text-sm font-semibold">Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}