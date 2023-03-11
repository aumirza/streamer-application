import { useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton } from "react-native-paper";

export function NewStreamButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("NewLiveStream");
  };
  return (
    <IconButton
      icon="plus"
      iconColor="white"
      size={30}
      onPress={handlePress}
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "red",
        borderRadius: 50,
      }}
    />
  );
}
