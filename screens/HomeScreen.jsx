import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StreamsScreen } from "./StreamsScreen";
import { PartyScreen } from "./PartyScreen";
import { FeedScreen } from "./FeedScreen";

const Tabs = createMaterialBottomTabNavigator();

export function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Navigator initialRouteName="Streams">
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
          name="Profile"
          component={StreamsScreen}
          options={{ tabBarIcon: "account" }}
        />
      </Tabs.Navigator>
    </SafeAreaView>
  );
}
