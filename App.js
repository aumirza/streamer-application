import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignupScreen } from "./screens/SignupScreen";

// extend the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#590193",
    secondary: "#4285F4",
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false, animation: "slide_from_left" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
