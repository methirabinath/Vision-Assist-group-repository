// register.tsx
import { BASE_URL } from '@/config';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            alert("Please fill all the fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Backend error:", data);
                return Alert.alert('Error', data.message);
            }

            Alert.alert('Success', 'Account created successfully!');
            router.replace('/login');

        } catch (error) {
            console.log("Fetch error:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <View className="flex-1 bg-slate-50">

            <StatusBar barStyle="dark-content" />

            {/* Top Section: Logo */}
            <View className="items-center pt-20 pb-10">

                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                    Get Started
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
            <ScrollView
                className="bg-white rounded-t-2xl px-8 pt-6 pb-6 mx-4 mt-4"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Full Name */}
                <View className="mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">
                        Full Name
                    </Text>
                    <TextInput
                        className="border-b border-slate-200 py-2 text-slate-900 text-base"
                        placeholder="Enter your full name"
                        placeholderTextColor="#94a3b8"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                {/* Email */}
                <View className="mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">
                        Email
                    </Text>
                    <TextInput
                        className="border-b border-slate-200 py-2 text-slate-900 text-base"
                        placeholder="Enter your email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>



                {/* Phone Number */}
                <View className="mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">
                        Phone Number
                    </Text>
                    <TextInput
                        className="border-b border-slate-200 py-2 text-slate-900 text-base"
                        placeholder="Enter your phone number"
                        placeholderTextColor="#94a3b8"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                {/* Password */}
                <View className="mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">
                        Password
                    </Text>
                    <View className="flex-row items-center border-b border-slate-200">
                        <TextInput
                            className="flex-1 py-2 text-slate-900 text-base"
                            placeholder="Enter your password"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                {/* Confirm Password */}
                <View className="mb-6">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">
                        Confirm Password
                    </Text>
                    <View className="flex-row items-center border-b border-slate-200">
                        <TextInput
                            className="flex-1 py-2 text-slate-900 text-base"
                            placeholder="Enter your password again"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                    </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity onPress={handleRegister} disabled={loading}
                    className="bg-blue-500 rounded-2xl py-3 items-center mb-4"
                >
                    <Text className="text-white text-base font-bold tracking-widest uppercase">
                        Create Account
                    </Text>
                </TouchableOpacity>

                {/* Sign In Link */}
                <View className="flex-row justify-center mb-4">
                    <Text className="text-slate-400 text-sm">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/login')} activeOpacity={0.6}>
                        <Text className="text-blue-500 text-sm font-semibold">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >


        </View >
    );
}