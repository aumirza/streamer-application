import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../constants/api";
import Toast from "react-native-simple-toast";
import AuthService from "../services/AuthService";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigator = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        user = JSON.parse(user);
        setUser(user);
      }
    });
  }, []);

  const login = async (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post(ENDPOINTS.LOGIN(), values)
        .then((res) => {
          if (res.data) {
            const { token, user } = res.data;
            AsyncStorage.setItem("token", token);
            AsyncStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            resolve(user);
            navigator.navigate("AuthenticatedStack");
          }
        })
        .catch((err) => {
          if (err.message) {
            Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
            console.log(err.message);
            reject(err.message);
          } else if (err.request) {
            console.log(err.request);
            Toast.showWithGravity(
              err.request._response,
              Toast.LONG,
              Toast.BOTTOM
            );
            reject(err.request._response);
          } else {
            console.log(err);
            Toast.showWithGravity(err, Toast.LONG, Toast.BOTTOM);
            reject(err);
          }
        });
    });
  };
  //   .post(ENDPOINTS.LOGIN(), values)
  //   .then((res) => {
  //     console.log(res.data);
  //     if (res.data) {
  //       AsyncStorage.setItem("token", res.data.token);
  //       // AsyncStorage.setItem("user", JSON.stringify(res.data.user));
  //       navigator.navigate("AuthenticatedStack");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     // if network error
  //     if (err.message === "Network Error") {
  //       setStatus("Network Error");
  //     } else if (err.request) {
  //       console.log(err.request);
  //     } else {
  //       setStatus(err);
  //     }
  //   })
  //   .finally(() => {
  //     setSubmitting(false);
  //   });

  const logout = () => {
    AuthService.logout()
      .then(() => {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
        Toast.showWithGravity(
          "Some error Occurred while logging out",
          Toast.LONG,
          Toast.BOTTOM
        );
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
