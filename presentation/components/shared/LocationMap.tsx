import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  latitude: number | string;
  longitude: number | string;
  title?: string;
  height?: number;
}

/**
 * Mapa embebido basado en OpenStreetMap + Leaflet renderizado dentro de un
 * WebView. No depende de react-native-maps ni de una API key de Google, por
 * lo que funciona de forma estable en el APK sin riesgo de crash nativo.
 */
const buildHtml = (lat: number, lng: number, title: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <style>
      html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; }
      .leaflet-control-attribution { font-size: 9px; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      var map = L.map('map', {
        zoomControl: true,
        attributionControl: true,
      }).setView([${lat}, ${lng}], 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(map);

      var marker = L.marker([${lat}, ${lng}]).addTo(map);
      ${title ? `marker.bindPopup(${JSON.stringify(title)}).openPopup();` : ""}
    </script>
  </body>
</html>
`;

const LocationMap = ({ latitude, longitude, title, height = 200 }: Props) => {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const hasValidCoords =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  return (
    <View className="mx-5 mt-4">
      <View className="flex-row items-center mb-2">
        <Ionicons name="map-outline" size={16} color="#2292A4" />
        <Text className="text-sm font-semibold text-gray-700 ml-2">
          Ubicación Geográfica
        </Text>
      </View>

      <View className="rounded-2xl overflow-hidden bg-gray-100" style={{ height }}>
        {hasValidCoords ? (
          <WebView
            style={{ flex: 1, backgroundColor: "transparent" }}
            originWhitelist={["*"]}
            javaScriptEnabled
            domStorageEnabled
            scrollEnabled={false}
            source={{ html: buildHtml(lat, lng, title ?? "") }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="location-outline" size={28} color="#9ca3af" />
            <Text className="text-sm text-gray-400 mt-2">
              Ubicación no disponible
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LocationMap;
