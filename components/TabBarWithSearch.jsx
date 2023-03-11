import { View, TouchableOpacity, Animated } from "react-native";
import { Text, useTheme } from "react-native-paper";
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
    >
      <Animated.Text
        style={{
          fontSize: isFocused ? 15 : 13,
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
  const { colors } = useTheme();
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
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          maxWidth: "60%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flex: 1,
          }}
        >
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
              fontSize: 23,
              color: "white",
            }}
          />
        </Text>
      </View>
    </View>
  );
}
