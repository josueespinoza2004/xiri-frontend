import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  latitude: number;
  longitude: number;
  title?: string;
  height?: number;
}

const LocationMap = ({ latitude, longitude, title, height = 180 }: Props) => {
  return (
    <View className="mx-5 mt-4 rounded-2xl overflow-hidden" style={{ height }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={title}
        />
      </MapView>
    </View>
  );
};

export default LocationMap;
