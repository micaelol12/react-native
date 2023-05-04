import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch()

  const logoutHandler = () => dispatch(authActions.logout())

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
          headerRight: ({tintColor}) => <IconButton icon="exit" color={tintColor} onPress={logoutHandler} size={24}/>,
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

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
