import axios from "axios";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Toast from "react-native-simple-toast";
import { PopularStrip } from "../components/PopularStrip";
import { StreamGrid } from "../components/StreamGrid";
import { ENDPOINTS } from "../constants/api";

import { createFakeStream } from "../data/streams";
import AuthService from "../services/AuthService";

export function ExploreStreamScreen() {
  const { colors } = useTheme();

  const [streams, setStreams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getStreams = async () => {
    // setTimeout(() => {
    //   const fakeStreams = createFakeStream(10);
    //   setStreams(fakeStreams);
    // }, 1000);

    const token = await AuthService.getToken();

    axios
      .get(ENDPOINTS.GET_LIVE_STREAMS(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          const { streams } = res.data;
          console.log(res.data);
          setStreams(streams);
        }
      })
      .catch((err) => {
        if (err.message) {
          Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
          console.log(err.message);
        } else if (err.request) {
          console.log(err.request);
          Toast.showWithGravity(
            err.request._response,
            Toast.LONG,
            Toast.BOTTOM
          );
        } else {
          console.log(err);
          Toast.showWithGravity(err, Toast.LONG, Toast.BOTTOM);
        }
      });
  };

  const refreshHandler = async () => {
    setRefreshing(true);
    await getStreams();
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      await getStreams();
    })();
  }, []);

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <View style={{ padding: 10 }}>
        <PopularStrip />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
        }
      >
        {streams && streams.length > 0 ? (
          <StreamGrid streams={streams} />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: colors.text }}>No streams found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
