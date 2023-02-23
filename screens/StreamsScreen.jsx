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

const Tabs = createMaterialTopTabNavigator();

export function StreamsScreen() {
  return (
    <Tabs.Navigator
      initialRouteName="Explore"
      tabBar={(props) => <TabBarWithSearch {...props} />}
      screenOptions={{
        tabBarShowIcon: false,
        swipeEnabled: true,
        tabBarContentContainerStyle: {},
        tabBarStyle: {
          width: "60%",
          display: "flex",
          backgroundColor: "transparent",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "uppercase",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "gray",
        },
      }}
    >
      <Tabs.Screen name="Following" component={Following} />
      <Tabs.Screen
        name="Explore"
        component={Explore}
        options={{ tabBarIcon: (props) => <MaterialIcon name="movie" /> }}
      />
    </Tabs.Navigator>
  );
}
