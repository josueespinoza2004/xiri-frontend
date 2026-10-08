import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "@/presentation/hooks/useProfile";

const TabsLayout = () => {
  const { profileQuery } = useProfile();
  const isAdmin = profileQuery.data?.rol === "admin";
  const isOwner = profileQuery.data?.rol === "owner";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#D96C06",
        tabBarInactiveTintColor: "#053225",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#F5EFED",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: "Rutas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="album"
        options={{
          title: "Álbum",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Colección",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield-outline" size={size} color={color} />
          ),
          href: isAdmin ? "/(tabs)/admin" : null,
        }}
      />
      <Tabs.Screen
        name="my-business"
        options={{
          title: "Mi Negocio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
          href: isOwner ? "/(tabs)/my-business" : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
