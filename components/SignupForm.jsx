// create a signup form component, which will be used to create a new user, uses react-native-paper ,
// and is exported as SignupForm, which is used in SignupScreen,it has a username, email, password, and a submit button to create a new user and continue with google button , and a login button to navigate to the login screen , on submit it will call the signup function which will log the details to the console

import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";

export function SignupForm() {
  const navigator = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const { colors } = useTheme();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 300,
      }}
    >
      <Text
        variant="displayMedium"
        style={{ color: "white", fontWeight: "bold" }}
      >
        Signup
      </Text>
      <TextInput
        style={{ marginTop: 10, width: "100%" }}
        label="Username"
        mode="outlined"
        left={<TextInput.Icon icon="account" iconColor={colors.primary} />}
      />
      <TextInput
        style={{ margin: 2, width: "100%" }}
        label="Email"
        mode="outlined"
        left={<TextInput.Icon icon="email" iconColor={colors.primary} />}
      />
      <TextInput
        secureTextEntry={!showPassword}
        style={{ marginBottom: 10, width: "100%" }}
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
          width: "100%",
          backgroundColor: colors.secondary,
        }}
        mode="contained"
        onPress={() => console.log("Pressed")}
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
        <Text style={{ color: "white" }}>Already have an account? </Text>
        <Button mode="text" onPress={() => navigator.navigate("Login")}>
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Login
          </Text>
        </Button>
      </View>
    </View>
  );
}
