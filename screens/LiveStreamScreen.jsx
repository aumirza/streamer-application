import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import React, { useRef } from "react";
import { Image, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export function LiveStreamScreen({ route }) {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };
  const playerRef = useRef();
  const { stream } = route.params;
  const bufferHandler = () => {
    console.log("buffering");
  };
  const errorHandler = () => {
    console.log("error");
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Video
        // ref={video}
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/shorts.mp4")}
        useNativeControls={false}
        resizeMode="cover"
        volume={1.0}
        isMuted={false}
        shouldPlay={true}
        isLooping={true}
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 30,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: 20,
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Image
                source={require("../assets/icons/person.png")}
                style={{ height: 30, width: 30 }}
              />
              <View
                style={{
                  marginLeft: 3,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>John doe</Text>
                <Text style={{ color: "lightblue", marginLeft: 5 }}>
                  +Follow
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 5,
                borderRadius: 15,
              }}
            >
              <Text style={{ color: "white" }}>{stream?.title}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 5,
                borderRadius: 15,
              }}
            >
              <Image
                source={require("../assets/icons/gold-coin.png")}
                style={{ height: 20, width: 20 }}
              />
              <Text style={{ color: "white" }}> Rank </Text>
              <Text style={{ color: "yellow" }}>10</Text>
            </View>
            {/* close button */}
            <IconButton
              icon="close"
              size={20}
              iconColor="white"
              onPress={navigateBack}
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: 50,
                padding: 5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                padding: 5,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton icon="trophy-outline" size={20} iconColor="white" />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: 15,
                  padding: 5,
                }}
              >
                <Text style={{ color: "white" }}>Live</Text>
                <Text style={{ color: "white" }}>1.2k viewers</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 20,
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <View>
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 10,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    borderRadius: 50,
                    paddingHorizontal: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>lvl 2</Text>
                </View>
                <Text style={{ color: "orange" }}>john doe</Text>
                <Text style={{ color: "white" }}>: joined</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: 30,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/icons/gift.png")}
                style={{ height: 60, width: 60 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 18,
                  backgroundColor: "transparent",
                  height: 40,
                  color: "white",
                }}
                textColor="#fff"
                cursorColor="white"
                placeholder="message"
                placeholderTextColor="white"
              />
              <IconButton iconColor="white" icon="menu" size={30} />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/icons/refresh.png")}
              style={{ height: 40, width: 40 }}
            />
            <Image
              source={require("../assets/icons/message.png")}
              style={{ height: 60, width: 60 }}
            />
            <Image
              source={require("../assets/icons/mic.png")}
              style={{ height: 60, width: 60 }}
            />
            <Image
              source={require("../assets/icons/phone.png")}
              style={{ height: 60, width: 60 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
