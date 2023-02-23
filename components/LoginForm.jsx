import { View } from "react-native";
import React, { useState } from "react";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export function LoginForm() {
  const navigator = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = () => {
    console.log("Submitted");
    navigator.navigate("Home");
  };

  const { colors } = useTheme();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        variant="displayMedium"
        style={{ color: "white", fontWeight: "bold" }}
      >
        Login
      </Text>
      <TextInput
        style={{ width: 300, margin: 2, marginTop: 10 }}
        label="Username"
        mode="outlined"
        left={<TextInput.Icon icon="account" iconColor={colors.primary} />}
      />

      <TextInput
        secureTextEntry={!showPassword}
        style={{ marginBottom: 10, width: 300 }}
        label="Password"
        mode="outlined"
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
          />
        }
        left={<TextInput.Icon icon="lock" iconColor={colors.primary} />}
      />
      <Button
        style={{
          marginTop: 10,
          width: 300,
          backgroundColor: colors.secondary,
        }}
        mode="contained"
        onPress={submitHandler}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
      </Button>

      <Button
        style={{ width: "100%" }}
        mode="text"
        onPress={() => navigator.navigate("ForgotPassword")}
      >
        <Text
          style={{
            textAlign: "left",
            color: "white",
            textDecorationLine: "underline",
          }}
        >
          Forgot Password
        </Text>
      </Button>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <Button
          style={{ textDecorationLIne: "underline" }}
          mode="text"
          onPress={() => navigator.navigate("Signup")}
        >
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Signup
          </Text>
        </Button>
      </View>
    </View>
  );
}
