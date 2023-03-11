import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useTheme } from "react-native-paper";

const Tag = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundLight,
        borderRadius: 20,
        paddingHorizontal: 17,
        paddingVertical: 5,
        marginHorizontal: 3,
      }}
    >
      {children}
    </View>
  );
};

const FlagIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: "white",
      marginHorizontal: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={require("../assets/flag.png")}
      style={{
        width: 18,
        height: 18,
        borderRadius: 9,
        resizeMode: "cover",
        borderColor: "white",
        borderWidth: 1,
      }}
    />
  </View>
);

const StackChildWrapper = ({ children, zIndex, shift }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: -shift,
      zIndex: zIndex,
    }}
  >
    {children}
  </View>
);

// overlapped children horizontally
const StackView = ({ children, shift = 7 }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: -shift,
    }}
  >
    {React.Children.map(children, (child, index) => (
      <StackChildWrapper
        zIndex={children.length - index}
        key={index}
        shift={shift}
      >
        {child}
      </StackChildWrapper>
    ))}
  </View>
);

export function PopularStrip() {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      style={{ flexDirection: "row", paddingVertical: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.primary,
          borderRadius: 20,
          paddingHorizontal: 17,
          marginHorizontal: 3,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Popular
        </Text>
      </View>

      {new Array(6).fill(0).map((_, index) => (
        <Tag key={index}>
          <StackView>
            {new Array(5).fill(0).map((_, index) => (
              <FlagIcon key={index} />
            ))}
          </StackView>
        </Tag>
      ))}
    </ScrollView>
  );
}

const randomBetween = (min, max) => Math.random() * (max - min) + min;
