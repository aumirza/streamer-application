import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";

export function SignupForm() {
  const navigator = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = () => {
    setError("SignUp Not allowed");
  };

  const { colors } = useTheme();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 300,
      }}
    >
      <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
        Signup
      </Text>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : ""}
      <TextInput
        style={{ marginTop: 10, width: "100%" }}
        label="Username"
        mode="outlined"
        error={error}
        left={<TextInput.Icon icon="account" iconColor={colors.primary} />}
      />
      <TextInput
        style={{ margin: 2, width: "100%" }}
        label="Email"
        mode="outlined"
        error={error}
        left={<TextInput.Icon icon="email" iconColor={colors.primary} />}
      />
      <TextInput
        secureTextEntry={!showPassword}
        style={{ marginBottom: 10, width: "100%" }}
        label="Password"
        mode="outlined"
        error={error}
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
          width: "100%",
          backgroundColor: colors.secondary,
        }}
        mode="contained"
        onPress={submitHandler}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Signup</Text>
      </Button>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text>Already have an account? </Text>
        <Button mode="text" onPress={() => navigator.navigate("Login")}>
          <Text style={{ textDecorationLine: "underline" }}>Login</Text>
        </Button>
      </View>
    </View>
  );
}
