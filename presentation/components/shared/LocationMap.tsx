import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

interface Props {
  latitude: number;
  longitude: number;
  title?: string;
  height?: number;
}

const LocationMap = ({ latitude, longitude, title, height = 200 }: Props) => {
  return (
    <View className="mx-5 mt-4">
      <View className="flex-row items-center mb-2">
        <Ionicons name="map-outline" size={16} color="#2292A4" />
        <Text className="text-sm font-semibold text-gray-700 ml-2">
          Ubicación Geográfica
        </Text>
      </View>

      <View className="rounded-2xl overflow-hidden" style={{ height }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={title}
          />
        </MapView>
      </View>
    </View>
  );
};

export default LocationMap;
