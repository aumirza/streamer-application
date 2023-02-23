import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TabBarWithSearch } from "../components/TabBarWithSearch";

function Explore() {
  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
}
function Following() {
  return (
    <View>
      <Text>Followings</Text>
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
    <Tabs.Navigator
      initialRouteName="Explore"
      tabBar={(props) => <TabBarWithSearch {...props} />}
    >
      <Tabs.Screen name="Following" component={Following} />
      <Tabs.Screen
        name="Explore"
        component={Explore}
        options={{ tabBarIcon: (props) => <MaterialIcon name="movie" /> }}
      />
      <Tabs.Screen name="Shorts" component={Shorts} />
    </Tabs.Navigator>
  );
}
