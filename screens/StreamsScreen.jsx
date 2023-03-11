import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ExploreStreamScreen } from "./ExploreStreamScreen";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";
import { NewStreamButton } from "../components/NewStreamButton";

function Following() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
        }}
      >
        No Followings
      </Text>
    </View>
  );
}

const Tabs = createMaterialTopTabNavigator();

export function StreamsScreen() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Tabs.Navigator
        initialRouteName="Explore"
        // tabBar={(props) => <TabBarWithSearch {...props} />}
        screenOptions={{
          // tabBarShowIcon: false,
          // swipeEnabled: true,
          tabBarStyle: {
            marginHorizontal: 20,
            shadowColor: "transparent",
          },
          tabBarContentContainerStyle: {},
          tabBarItemStyle: {
            flexDirection: "row",
          },
          tabBarLabelStyle: {},
          tabBarActiveTintColor: colors.primary,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Tabs.Screen
          name="Explore"
          component={ExploreStreamScreen}
          options={{
            tabBarIcon: (props) => (
              <MaterialIcon name="people" size={20} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen name="Following" component={Following} />
      </Tabs.Navigator>

      <NewStreamButton />
    </View>
  );
}
