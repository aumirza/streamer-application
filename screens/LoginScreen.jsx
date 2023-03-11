import { View } from "react-native";
import React, { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import { LoginForm } from "../components/LoginForm";
import { GoogleLoginButton } from "../components/GoogleLoginButton";

export function LoginScreen() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <LoginForm />
      <GoogleLoginButton />
    </View>
  );
}
