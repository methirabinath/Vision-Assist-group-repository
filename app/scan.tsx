import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.08, duration: 1000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);
        setTimeout(() => { }, 500);
    };

    // Permission Loading 
    if (!permission) {
        return (
            <View className="flex-1 bg-slate-50 items-center justify-center px-6">
                <StatusBar barStyle="dark-content" />
                <Text className="text-slate-400 text-sm">Requesting camera permission...</Text>
            </View>
        );
    }

    // ── Permission Denied ──
    if (!permission.granted) {
        return (
            <View className="flex-1 bg-slate-50">
                <StatusBar barStyle="dark-content" />

                {/* Logo */}
                <View className="items-center pt-20 pb-10">
                    <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                        Device Setup
                    </Text>
                    <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                        Vision<Text className="text-blue-500">Assist</Text>
                    </Text>
                    <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />
                    <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                        Smart Vision. Smart Living.
                    </Text>
                </View>

                {/* Card */}
                <View className="flex-1 bg-white rounded-t-3xl px-8 pt-10 items-center">

                    <View className="w-16 h-16 bg-blue-50 rounded-2xl items-center justify-center mb-6">
                        <Ionicons name="camera-outline" size={32} color="#3b82f6" />
                    </View>

                    <Text className="text-slate-900 text-xl font-bold tracking-tight mb-3">
                        Camera Access Required
                    </Text>

                    <Text className="text-slate-400 text-sm text-center leading-6 mb-10">
                        VisionAssist needs camera access to scan the QR code and link your device.
                    </Text>

                    <TouchableOpacity
                        onPress={requestPermission}
                        className="bg-blue-500 rounded-2xl py-4 px-12 mb-4 w-full items-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-base tracking-widest uppercase">
                            Grant Permission
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.6}>
                        <Text className="text-slate-400 text-sm font-semibold">Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    // ── Main Scan Screen ──
    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* Top Section: Logo */}
            <View className="items-center pt-16 pb-8">

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-6 top-4 w-10 h-10 rounded-full border border-slate-200 bg-white items-center justify-center"
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={18} color="#475569" />
                </TouchableOpacity>

                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                    Device Setup
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

                {/* Instructions */}
                <Text className="text-slate-900 text-2xl font-bold tracking-tight mb-1">
                    Scan QR Code
                </Text>
                <View className="w-8 h-0.5 bg-blue-500 mb-2" />
                <Text className="text-slate-400 text-sm leading-6 mb-6">
                    Point your camera at the QR code on your VisionAssist device to link it.
                </Text>

                {/* Camera Viewfinder */}
                <View className="rounded-2xl overflow-hidden aspect-square w-full bg-slate-900 relative">
                    <CameraView
                        style={StyleSheet.absoluteFillObject}
                        facing="back"
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                    />

                    {/* Corner Markers */}
                    <View className="absolute inset-0 items-center justify-center">
                        <View className="w-52 h-52 relative">
                            <View className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white rounded-tl-xl" />
                            <View className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white rounded-tr-xl" />
                            <View className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-xl" />
                            <View className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white rounded-br-xl" />
                        </View>
                    </View>

                    {/* Scanned Success Overlay */}
                    {scanned && (
                        <View className="absolute inset-0 bg-green-500/90 items-center justify-center">
                            <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-3">
                                <Ionicons name="checkmark" size={32} color="#22c55e" />
                            </View>
                            <Text className="text-white text-lg font-bold tracking-wide">
                                Device Linked!
                            </Text>
                        </View>
                    )}
                </View>

                {/* Pulse Indicator */}
                <View className="items-center mt-8">
                    <Animated.View
                        style={{ transform: [{ scale: pulseAnim }] }}
                        className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center"
                    >
                        <View className="w-3 h-3 bg-blue-500 rounded-full" />
                    </Animated.View>
                    <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mt-3">
                        {scanned ? 'Linked' : 'Scanning...'}
                    </Text>
                </View>

            </View>
        </View>
    );
}