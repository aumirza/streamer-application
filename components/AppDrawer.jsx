import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import { SettingScreen } from "../screens/SettingScreen";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
