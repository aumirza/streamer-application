import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TabBarWithSearch } from "../components/TabBarWithSearch";

function Explore() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No feeds</Text>
    </View>
  );
}
function Following() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No Followings</Text>
    </View>
  );
}

function Shorts() {
  return (
    <View>
      <Text>Shorts</Text>
    </View>
  );
}

const Tabs = createMaterialTopTabNavigator();

export function FeedScreen() {
  return (
    <Tabs.Navigator initialRouteName="Following">
      <Tabs.Screen name="Following" component={Following} />
      <Tabs.Screen name="Explore" component={Explore} />
      {/* <Tabs.Screen name="Shorts" component={Shorts} /> */}
    </Tabs.Navigator>
  );
}
