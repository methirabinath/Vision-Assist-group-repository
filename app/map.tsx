import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../firebase";

export default function GpsMapScreen() {

    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {

        const trackingRef = ref(db, "tracking");

        const unsubscribe = onValue(trackingRef, (snapshot) => {

            const data = snapshot.val();

            if (!data) return;

            const userLocations = Object.entries(data).map(([userId, loc]: any) => ({
                id: userId,
                latitude: loc.latitude,
                longitude: loc.longitude
            }));

            setLocations(userLocations);

        });

        return () => unsubscribe();

    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                zoomEnabled
                scrollEnabled
                initialRegion={{
                    latitude: 7.8731,
                    longitude: 80.7718,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        coordinate={{
                            latitude: loc.latitude,
                            longitude: loc.longitude
                        }}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
});