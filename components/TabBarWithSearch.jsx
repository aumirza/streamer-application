import { View, TouchableOpacity, Animated } from "react-native";
import { Text } from "react-native-paper";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

const TabRoute = ({ route, options, navigation, isFocused, position }) => {
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}
    >
      <Animated.Text
        style={{
          fontSize: isFocused ? 13 : 11,
          transition: "all 0.3s ease",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export function TabBarWithSearch({ state, descriptors, navigation, position }) {
  const borderPosition = position.interpolate({
    inputRange: state.routes.map((_, i) => i),
    outputRange: state.routes.map((_, i) => (i * 280) / state.routes.length),
  });
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "#6c6c6c",
      }}
    >
      <View
        style={{
          flex: 1,
          maxWidth: "60%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {state.routes.map((route, index) => (
            <TabRoute
              key={route.key}
              route={route}
              options={descriptors[route.key].options}
              navigation={navigation}
              isFocused={state.index === index}
              position={position}
            />
          ))}
        </View>

        <View style={{ height: 2, width: "100%", position: "relative" }}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              transform: [{ translateX: borderPosition }],
              width: 100 / state.routes.length / 3 + "%",
              height: 3,
              borderRadius: 5,
              backgroundColor: "white",
            }}
          />
        </View>
      </View>
      <View>
        <Text>
          <FontAwesomeIcon
            name="search"
            style={{
              flex: 1,
              fontSize: 20,
              color: "white",
            }}
          />
        </Text>
      </View>
    </View>
  );
}
