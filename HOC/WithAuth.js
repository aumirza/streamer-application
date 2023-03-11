import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const WithAuth = (Component) => () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return <Component user={user} />;
};
