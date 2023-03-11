import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PopularStrip } from "../components/PopularStrip";
import { StreamGrid } from "../components/StreamGrid";

export function ExploreStreamScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background }}>
      <PopularStrip />
      <ScrollView>
        <StreamGrid />
      </ScrollView>
    </View>
  );
}
