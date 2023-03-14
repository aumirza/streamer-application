import { View, Text, ScrollView } from "react-native";
import { StreamCard } from "./StreamCard";

const createPairs = (arr) =>
  arr.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);

export function StreamGrid({ streams }) {
  return (
    <View>
      {createPairs(streams).map((pair, index) => (
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
