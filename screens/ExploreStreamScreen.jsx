import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PopularStrip } from "../components/PopularStrip";
import { StreamGrid } from "../components/StreamGrid";

import { createFakeStream } from "../data/streams";
import ApiServices from "../services/ApiServices";

export function ExploreStreamScreen() {
  const { colors } = useTheme();

  const [streams, setStreams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getStreams = async () => {
    setTimeout(() => {
      const fakeStreams = createFakeStream(10);
      setStreams(fakeStreams);
    }, 1000);

    // await ApiServices.getLiveStreams().then((res) => {
    //   setStreams(res.data);
    // });
  };

  const refreshHandler = async () => {
    setRefreshing(true);
    await getStreams();
    setRefreshing(false);
  };

  useEffect(() => {
    getStreams().then(() => {});
  }, []);

  return (
    <View style={{ backgroundColor: colors.background }}>
      <PopularStrip />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
        }
      >
        {streams && streams.length > 0 ? (
          <StreamGrid streams={streams} />
        ) : (
          <View>
            <RefreshControl />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
