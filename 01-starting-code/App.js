import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import store from "./store/store";
import IconButton from "./components/ui/IconButton";
import { authActions } from "./store/slices/authSlice";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(authActions.logout());

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              onPress={logoutHandler}
              size={24}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const isAuthenticated = useSelector((state) => {
    return state.auth;
  }).isAuthenticated;

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  const fetchToken = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem("token");

    if (storedToken) {
      dispatch(authActions.authenticate(storedToken));
    }

    setAppIsReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return <Navigation />;
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
