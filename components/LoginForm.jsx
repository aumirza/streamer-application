import { View } from "react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  useTheme,
  HelperText,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AuthService from "../services/AuthService";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { ENDPOINTS } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from "formik";

export function LoginForm() {
  const navigator = useNavigation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting, resetForm, setError }) => {
      setSubmitting(true);
      axios
        .post(ENDPOINTS.LOGIN(), values)
        .then((res) => {
          if (res.data) {
            AsyncStorage.setItem("token", res.data.token);
            // AsyncStorage.setItem("user", JSON.stringify(res.data.user));
            navigator.navigate("Home");
          }
          setSubmitting(false);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setSubmitting(false);
        });
      console.log(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const { colors } = useTheme();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
        Login
      </Text>
      <TextInput
        style={{
          width: 300,
          margin: 2,
          marginTop: 10,
        }}
        label="Username"
        mode="outlined"
        error={formik.errors.email}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        left={<TextInput.Icon icon="account" iconColor={colors.primary} />}
      />

      <TextInput
        secureTextEntry={!showPassword}
        style={{ marginBottom: 10, width: 300, backgroundColor: "white" }}
        label="Password"
        mode="outlined"
        error={formik.errors.password}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
          />
        }
        left={<TextInput.Icon icon="lock" iconColor={colors.primary} />}
      />
      {!formik.isValid ? (
        <HelperText type="error" visible={!formik.isValid}>
          {Object.values(formik.errors).map((error) => error + "/n")}
        </HelperText>
      ) : (
        ""
      )}
      <Button
        style={{
          marginTop: 10,
          width: 300,

          backgroundColor: colors.secondary,
        }}
        mode="contained"
        onPress={submitHandler}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
      </Button>

      <Button
        style={{ width: "100%" }}
        mode="text"
        onPress={() => navigator.navigate("ForgotPassword")}
      >
        <Text
          style={{
            textAlign: "left",
            textDecorationLine: "underline",
          }}
        >
          Forgot Password
        </Text>
      </Button>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Don't have an account?</Text>
        <Button
          style={{ textDecorationLIne: "underline" }}
          mode="text"
          onPress={() => navigator.navigate("Signup")}
        >
          <Text style={{ textDecorationLine: "underline" }}>Signup</Text>
        </Button>
      </View>
    </View>
  );
}
