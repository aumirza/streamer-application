import React from "react";
import { Image, View } from "react-native";
import { Appbar, IconButton, Text } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import AuthService from "../services/AuthService";

export function TopBar() {
  const { user } = useAuth();
  return (
    <Appbar.Header style={{ backgroundColor: "#fff" }} statusBarHeight={0}>
      <IconButton
        onLongPress={() => AuthService.logout()}
        icon={() => (
          <Image
            source={require("../assets/icons/person.png")}
            style={{ width: "100%", height: "100%" }}
          />
        )}
        size={30}
        onPress={() => {}}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/icons/gold-coin.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text style={{ marginLeft: 3 }}>{user.rank}</Text>
      </View>
      <Appbar.Content title="" />
      <Appbar.Action icon="trophy-outline" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="bell-outline" onPress={() => {}} />
    </Appbar.Header>
  );
}
