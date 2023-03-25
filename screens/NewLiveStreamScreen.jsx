import axios from "axios";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";
import { NodeCameraView } from "react-native-nodemediaclient";
import { ENDPOINTS, LIVE_SERVER_URL } from "../constants/api";
import AuthService from "../services/AuthService";
import NewLiveStreamActions from "../components/NewLiveStreamActions";
import { Text } from "react-native-paper";
import { View } from "react-native";

export function NewLiveStreamScreen({}) {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [streamUrl, setStreamUrl] = useState("");

  const [cameraPermission, setCameraPermission] = useState(null);
  const [micPermission, setMicPermission] = useState(null);
  const streamRef = useRef(null);

  const startStream = async () => {
    if (stream) {
      setIsPublishing(true);
      console.log("starting stream");
      streamRef.current.start();
      Toast.show("Publishing", Toast.LONG, Toast.BOTTOM);
    } else {
      Toast.show("Stream not created", Toast.LONG, Toast.BOTTOM);
    }
  };

  const checkPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
    const { status: micStatus } =
      await Camera.requestMicrophonePermissionsAsync();
    setMicPermission(micStatus === "granted");
  };

  const showError = (error) => {
    console.log(error);
    Toast.showWithGravity(error, Toast.LONG, Toast.BOTTOM);
    setError(error);
  };

  useEffect(() => {
    if (cameraPermission === null || micPermission === null) return;
    if (!cameraPermission || !micPermission) {
      Toast.show(
        "Camera and Mic Permission Required",
        Toast.LONG,
        Toast.BOTTOM
      );
      // navigation.goBack();
      return;
    }
    (async () => {
      setIsFetching(true);
      const token = await AuthService.getToken();
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
          setStreamUrl(`rtmp://${LIVE_SERVER_URL}/live/${res.data.key}`);
          Toast.showWithGravity("You are live now", Toast.LONG, Toast.BOTTOM);
        })
        .catch((err) => {
          if (err?.message) showError(err.message);
          else if (err?.request) showError("Network Error");
          else
            Toast.showWithGravity(
              "Some Error Occurred",
              Toast.LONG,
              Toast.BOTTOM
            );
        })
        .finally(() => {
          setIsFetching(false);
        });
    })();
  }, [cameraPermission, micPermission]);

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      startStream();
    }
  }, [streamRef.current]);

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      {stream ? (
        <NodeCameraView
          style={{ flex: 1 }}
          ref={streamRef}
          outputUrl={streamUrl}
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
      <NewLiveStreamActions stream={stream} streamRef={streamRef} />
    </SafeAreaView>
  );
}
