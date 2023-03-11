import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StreamsScreen } from "./StreamsScreen";
import { PartyScreen } from "./PartyScreen";
import { FeedScreen } from "./FeedScreen";
import { ChatScreen } from "./ChatScreen";
import { TopBar } from "../components/TopBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeScreen() {
  const Tabs = createMaterialBottomTabNavigator();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }} edges={["top"]}>
      {/* <AppDrawer /> */}
      <TopBar />
      <Tabs.Navigator
        initialRouteName="Streams"
        activeColor={colors.primary}
        // inactiveColor="gray"
        // barStyle={{ backgroundColor: colors.background }}
        screenOptions={{
          tabBarShowIcon: true,
        }}
      >
        <Tabs.Screen
          name="Streams"
          component={StreamsScreen}
          options={{ tabBarIcon: "movie" }}
        />
        <Tabs.Screen
          name="Party"
          component={PartyScreen}
          options={{ tabBarIcon: "party-popper" }}
        />
        <Tabs.Screen
          name="Feed"
          component={FeedScreen}
          options={{ tabBarIcon: "newspaper" }}
        />
        <Tabs.Screen
          name="Chat"
          component={ChatScreen}
          options={{ tabBarIcon: "chat" }}
        />
      </Tabs.Navigator>
    </SafeAreaView>
  );
}
