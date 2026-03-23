import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname !== null && pathname === path;


    const iconColor = (path: string) => (isActive(path) ? '#2563eb' : '#6b7280');
    const textStyle = (path: string) =>
        isActive(path)
            ? 'text-blue-600 font-bold'
            : 'text-gray-500 font-semibold';

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 24,
                left: 20,
                right: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 28,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingVertical: 1,
                paddingHorizontal: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 24,
                elevation: 12,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.06)',
            }}
        >


            {/* Home */}
            <TouchableOpacity
                className="items-center py-3 px-4"
                onPress={() => router.push('/home')}
            >
                <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isActive('/') ? 'bg-blue-50' : ''
                    }`}>
                    <Ionicons name="home" size={24} color={iconColor('/')} />
                </View>
                <Text className={`text-xs mt-1 ${textStyle('/')}`}>Home</Text>
            </TouchableOpacity>

            {/* Routes */}
            <TouchableOpacity
                className="items-center py-3 px-4"
                onPress={() => router.push('/map')}
            >
                <View className="w-12 h-12 items-center justify-center">
                    <Ionicons name="location-outline" size={26} color={iconColor('/map')} />
                </View>
                <Text className={`text-xs mt-1 ${textStyle('/map')}`}>Routes</Text>
            </TouchableOpacity>

            {/* Alerts */}
            <TouchableOpacity
                className="items-center py-3 px-4"
                onPress={() => router.push('/alerts')}
            >
                <View className="w-12 h-12 items-center justify-center">
                    <Ionicons name="notifications-outline" size={26} color={iconColor('/alerts')} />
                </View>
                <Text className={`text-xs mt-1 ${textStyle('/alerts')}`}>Alerts</Text>
            </TouchableOpacity>

            {/* Account */}
            <TouchableOpacity
                className="items-center py-3 px-4"
                onPress={() => router.push('/account')}
            >
                <View className="w-12 h-12 items-center justify-center">
                    <Ionicons name="person-outline" size={26} color={iconColor('/account')} />
                </View>
                <Text className={`text-xs mt-1 ${textStyle('/account')}`}>Account</Text>
            </TouchableOpacity>
        </View>

    );
}
