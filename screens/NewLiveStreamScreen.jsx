import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Text, TextInput } from "react-native-paper";
import { Camera } from "expo-camera";
import { NodeCameraView } from "react-native-nodemediaclient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function NewLiveStreamScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = React.useState(Camera.Constants.Type.back);

  const [stream, setStream] = useState(null);

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  useEffect(() => {
    if (permission === null) {
      requestPermission();
    }

    if (permission === false) {
      alert("Permission to access camera is required!");
    }

    if (permission === true) {
      setIsSubmitting(true);
      AsyncStorage.getItem("token")
        .then(async (token) => {
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
              console.log(err);
            })
            .finally(() => {
              console.log("Finally");
              setIsSubmitting(false);
            });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Camera type={type} style={{ flex: 1 }}> */}
      <NodeCameraView
        style={{ flex: 1 }}
        // ref={(vb) => {}}
        outputUrl={+"1"}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
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
      {/* action buttons bottom right */}

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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <IconButton iconColor="white" icon="flash" size={30} />
            <IconButton iconColor="white" icon="camera" size={30} />
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
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <IconButton iconColor="white" icon="circle" size={30} />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 18,
                  backgroundColor: "transparent",
                  height: 40,
                }}
                textColor="white"
                cursorColor="white"
                placeholder="Add message..."
              />
              <IconButton iconColor="white" icon="menu" size={30} />
            </View>
          </View>
          {isSubmitting ? (
            <IconButton
              icon="loading"
              iconColor="white"
              size={30}
              style={{ marginLeft: 20 }}
            />
          ) : null}
          <View>
            <IconButton
              iconColor="white"
              icon="refresh"
              onPress={flipCamera}
              size={30}
            />
            <IconButton iconColor="white" icon="close" size={30} />
            <IconButton iconColor="white" icon="circle" size={30} />
            <IconButton iconColor="white" icon="check" size={30} />
          </View>
        </View>
      </View>
      {/* </Camera> */}
    </SafeAreaView>
  );
}
