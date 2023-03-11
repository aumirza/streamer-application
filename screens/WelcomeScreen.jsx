// import React from "react";
// import { View, Image, Text, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export const WelcomeScreen = () => {
//   return (
//     <LinearGradient
//       colors={["#4c669f", "#3b5998", "#192f6a"]}
//       style={styles.background}
//     >
//       <View style={styles.logoContainer}>
//         <Image source={require("../assets/icon.png")} style={styles.logo} />
//         <Text style={styles.tagline}>Welcome to My App</Text>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 50,
//   },
//   logo: {
//     width: 200,
//     height: 200,
//   },
//   tagline: {
//     fontSize: 25,
//     fontWeight: "600",
//     marginTop: 20,
//     color: "#fff",
//   },
// });

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useTheme } from "react-native-paper";

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [opacity] = useState(new Animated.Value(0));
  const { colors } = useTheme();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    background: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    content: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      color: "#fff",
      textAlign: "center",
      marginBottom: 30,
      paddingHorizontal: 30,
    },
    button: {
      backgroundColor: "#fff",
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primary,
    },
  });

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Streamer</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
