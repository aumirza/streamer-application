import { View, Text, ScrollView } from "react-native";
import { createFakeStream } from "../data/streams";
import { StreamCard } from "./StreamCard";

const streams = createFakeStream(10);
const streamPairs = streams.reduce((acc, stream, index) => {
  if (index % 2 === 0) {
    acc.push([stream]);
  } else {
    acc[acc.length - 1].push(stream);
  }
  return acc;
}, []);

export function StreamGrid() {
  return (
    <View>
      {streamPairs.map((pair, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            marginBottom: 5,
            position: "relative",
          }}
        >
          {pair.map((stream) => (
            <View
              key={stream.id}
              style={{
                flex: 1,
                width: "47%",
                aspectRatio: 1,
                marginHorizontal: 5,
              }}
            >
              <StreamCard key={stream.id} stream={stream} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
