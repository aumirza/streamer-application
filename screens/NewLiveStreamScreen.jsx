import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SocketIOClient from "socket.io-client";
import Toast from "react-native-simple-toast";
import { NodeCameraView } from "react-native-nodemediaclient";
import {
  ENDPOINTS,
  LIVE_SERVER_URL,
  SOCKET_SERVER_URL,
} from "../constants/api";
import { useAuth } from "../hooks/useAuth";
import AuthService from "../services/AuthService";

export function NewLiveStreamScreen({ route }) {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);

  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [message, setMessage] = useState("");

  const streamRef = useRef(null);

  const startStream = async () => {
    if (stream) {
      setIsPublishing(true);
      streamRef.current.start();
    } else {
      Toast.show("Stream not created", Toast.LONG, Toast.BOTTOM);
    }
  };

  useEffect(() => {
    if (streamRef.current) {
      startStream();
    }
  }, [streamRef.current]);

  const socket = SocketIOClient(SOCKET_SERVER_URL, {
    transports: ["websocket"],
  });

  socket.on("live-message", (data) => {
    console.log(data);
    setMessages((messages) => [...messages, data]);
  });

  socket.on("join", (data) => {
    const newMesaages = [
      ...messages.slice(-3),
      // [...data],
      {
        user: {
          level: 1,
          name: "ABC user",
        },
        message: "Joined",
        type: "connected",
      },
    ];
    setMessages(newMesaages);
  });

  const sendMessage = () => {
    if (message) {
      socket.emit("stream-message", {
        streamId: stream?.id,
        message,
        user: {
          level: 1,
          name: "ABC user",
        },
      });
    }
    setMessage("");
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
        { text: "OK", onPress: () => navigation.goBack() },
      ],
      { cancelable: false }
    );
  };

  const flipCamera = () => {
    streamRef.current.switchCamera();
  };

  const showError = (error) => {
    console.log(error);
    Toast.showWithGravity(error, Toast.LONG, Toast.BOTTOM);
    setError(error);
  };

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    // change the audio state
  };

  useEffect(() => {
    (async () => {
      if (
        permission === null ||
        permission === undefined ||
        permission.canAskAgain
      ) {
        requestPermission();
      }

      if (permission?.status === "denied") {
        showError("Permission to access camera is required");
      }

      if (permission?.granted) {
        setIsFetching(true);
        const token = AuthService.getToken();
        console.log("token for new stream: ", token);
        await axios
          .post(
            ENDPOINTS.CREATE_LIVE_STREAM(),
            {
              title: "New Stream",
              description: "New Stream",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setStream(res.data);
          })
          .catch((err) => {
            if (err?.message) showError(err.message);
            else if (err?.request) showError("Network Error");
            else Toast.show("Some Error Occurred", Toast.LONG, Toast.BOTTOM);
          })
          .finally(() => {
            setIsFetching(false);
          });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      {stream ? (
        <NodeCameraView
          style={{ flex: 1 }}
          ref={(vb) => (streamRef.current = vb)}
          outputUrl={`${LIVE_SERVER_URL}/${stream.key}`}
          camera={{
            cameraId: Camera.Constants.Type.front,
            cameraFrontMirror: true,
          }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            {!isFetching && error ? "Some Error Occurred" : "Loading Stream..."}
          </Text>
        </View>
      )}
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
                <Text style={{ color: "white" }}>{user.name}</Text>
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
