import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light"></StatusBar>
      <NavigationContainer>
        <BottomTab.Navigator
          initialRouteName="user"
          screenOptions={{
            headerStyle: { backgroundColor: "#3c0a6b" },
            headerTintColor: "white",
            tabBarActiveTintColor: '#3c0a6b'
          }}
        >
          <BottomTab.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="User"
            component={UserScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}
