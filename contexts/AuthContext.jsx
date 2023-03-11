import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../constants/api";
import AuthService from "../services/AuthService";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const login = async (username, password) => {
    axios.post(ENDPOINTS.LOGIN(), { username, password }).then((res) => {
      if (res.data) {
        AsyncStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        return res.data.user;
      }
    });
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
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
