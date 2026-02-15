// register.tsx
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
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
                        />
                        <TouchableOpacity>
                            <Text className="text-slate-400 text-lg px-2">👁</Text>
                        </TouchableOpacity>
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
                        />
                        <TouchableOpacity>
                            <Text className="text-slate-400 text-lg px-2">👁</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity
                    className="bg-blue-500 rounded-2xl py-3 items-center mb-4"
                >
                    <Text className="text-white text-base font-bold tracking-widest uppercase">
                        Create Account
                    </Text>
                </TouchableOpacity>

                {/* Sign In Link */}
                <View className="flex-row justify-center mb-4">
                    <Text className="text-slate-400 text-sm">Already have an account? </Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 text-sm font-semibold">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    );
}