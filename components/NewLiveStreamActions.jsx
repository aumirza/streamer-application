import { View, BackHandler, Image, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SocketIOClient from "socket.io-client";
import { IconButton, Text, TextInput } from "react-native-paper";
import axios from "axios";

import { ENDPOINTS, SOCKET_SERVER_URL } from "../constants/api";
import { useAuth } from "../hooks/useAuth";
import AuthService from "../services/AuthService";

export default function NewLiveStreamActions({ stream, streamRef }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isMuted, setIsMuted] = useState(false);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const flipCamera = () => {
    streamRef.current.switchCamera();
  };

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    // change the audio state
  };

  const socket = SocketIOClient(SOCKET_SERVER_URL, {
    transports: ["websocket"],
  });

  socket.on("stream-message-receive", (data) => {
    setMessages((messages) => [...messages, data]);
  });

  socket.on("new-user-joined", (data) => {
    const newMessages = [
      ...messages.slice(-3),
      // [...data],
      {
        ...data,
        type: "notification",
        category: "join",
      },
    ];
    setMessages(newMessages);
  });

  const sendMessage = () => {
    if (message) {
      socket.emit("stream-message-send", {
        streamId: stream?.id,
        message,
        sender: user,
      });
    }
    setMessages((messages) => [
      ...messages.slice(-3),
      {
        message,
        sender: user,
        type: "message",
        category: "sent",
      },
    ]);
    setMessage("");
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = (e) => {
        e.preventDefault();
        navigateBack();
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const endStream = async () => {
    const token = AuthService.getToken();
    streamRef.current.stop();
    return new Promise((resolve, reject) => {
      // socket.emit("end-stream", stream?.id);
      axios
        .delete(ENDPOINTS.GET_LIVE_STREAM(stream?.id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const navigateBack = () => {
    Alert.alert(
      "Are you sure?",
      "Stream will be stopped.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            endStream().then(() => {});
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
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
              paddingHorizontal: 5,
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
              <Text style={{ color: "white" }}>{user.name}</Text>
              <Text style={{ color: "lightblue", marginLeft: 5 }}>+Follow</Text>
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
            <Text style={{ color: "yellow" }}>{user.rank}</Text>
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
              <Text style={{ color: "white" }}>{stream?.viewers} </Text>
              <Text style={{ color: "white" }}>live viewers</Text>
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
          {messages.map((message, index) => (
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
              {message.type &&
              message.type === "notification" &&
              message.category === "join" ? (
                <View>
                  <View
                    style={{
                      color: "white",
                      backgroundColor: "green",
                      borderRadius: 50,
                      paddingHorizontal: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      lvl {message.user?.level}
                    </Text>
                  </View>
                  <Text style={{ color: "orange" }}>{message.user}</Text>
                  <Text style={{ color: "white" }}>: joined</Text>
                </View>
              ) : (
                <View>
                  <Text style={{ color: "orange" }}>{message.sender}</Text>
                  <Text style={{ color: "white" }}>: {message.message}</Text>
                </View>
              )}
            </View>
          ))}

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
              value={message}
              onChangeText={setMessage}
            />
            {message ? (
              <IconButton
                icon="send"
                size={30}
                iconColor="white"
                onPress={sendMessage}
              />
            ) : (
              <IconButton icon="menu" size={30} iconColor="white" />
            )}
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <IconButton
            icon={require("../assets/icons/refresh.png")}
            size={30}
            onPress={flipCamera}
          />
          <Image
            source={require("../assets/icons/message.png")}
            style={{ height: 60, width: 60 }}
          />
          <IconButton
            icon={require("../assets/icons/mic.png")}
            size={30}
            onPress={toggleAudio}
            style={{ backgroundColor: isMuted ? "red" : "transparent" }}
          />
          <IconButton
            icon={require("../assets/icons/phone.png")}
            size={30}
            onPress={() => {
              console.log("phone");
              streamRef.current?.start();
            }}
          />
        </View>
      </View>
    </View>
  );
}
