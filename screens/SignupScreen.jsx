import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { SignupForm } from "../components/SignupForm";
import { GoogleLoginButton } from "../components/GoogleLoginButton";

export function SignupScreen() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
      }}
    >
      <SignupForm />
      <GoogleLoginButton />
    </View>
  );
}
