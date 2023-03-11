import { View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Text, TextInput } from "react-native-paper";
import { Camera } from "expo-camera";
import { NodeCameraView } from "react-native-nodemediaclient";

export function NewLiveStreamScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = React.useState(Camera.Constants.Type.back);

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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera type={type} style={{ flex: 1 }}>
        {/* <NodeCameraView
        style={{ height: 400 }}
        // ref={(vb) => {
        //   this.vb = vb;
        // }}
        outputUrl={"rtmp://192.168.0.10/live/stream"}
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
      /> */}
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
      </Camera>
    </SafeAreaView>
  );
}
