import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiServices from "./ApiServices";

class AuthService {
  constructor() {}

  login = async (email, password) => {
    try {
      const data = await ApiServices.login(email, password);
      await AsyncStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.log("AuthService Login failed", error);
      return { message: error };
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("AuthService getToken", token);
    return token;
  };

  getCurrentUser = async () => {
    const token = await this.getToken();
    if (token) {
      return token;
    }
    return null;
  };
}

export default new AuthService();
