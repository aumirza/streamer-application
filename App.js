import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import axios from "./config/axios";
import { AuthProvider } from "./contexts/AuthContext";
import { DrawerProvider } from "./contexts/DrawerContext";
import { WithAuth } from "./HOC/WithAuth";
import { useAuth } from "./hooks/useAuth";
import { HomeScreen } from "./screens/HomeScreen";
import { LiveStreamScreen } from "./screens/LiveStreamScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { NewLiveStreamScreen } from "./screens/NewLiveStreamScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";

// extend the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#C74803",
    secondary: "#717171",
    // background: "#242424",
    backgroundLight: "#434343",
  },
};

function AuthenticatedStack({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("AuthenticatedStack user", user);
      navigation.navigate("Home");
    }
  }, [user]);

  const Stack = createNativeStackNavigator();
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewLiveStream"
      component={NewLiveStreamScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LiveStream"
      component={LiveStreamScreen}
      options={{
        headerShown: false,
        animation: "fade",
      }}
    />
  </Stack.Navigator>;
}

function AuthStack({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("AuthStack user", user);
      navigation.navigate("Home");
    }
  }, [user]);

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  // const AuthenticatedStackWithAUth = WithAuth(AuthenticatedStack);
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <DrawerProvider>
          <AuthProvider>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={AuthenticatedStack}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </AuthProvider>
        </DrawerProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
