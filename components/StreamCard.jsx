import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export function StreamCard({ stream }) {
  const navigate = useNavigation();

  const clickHandler = () => {
    navigate.navigate("LiveStream", { streamId: stream?.id });
  };
  return (
    <TouchableOpacity
      onPress={clickHandler}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
      <ImageBackground
        source={{ uri: stream.thumbnail }}
        borderRadius={10}
        style={{ flex: 1 }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          borderBottomStartRadius: 10,
          borderBottomEndRadius: 10,
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 5,
          paddingVertical: 5,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>{stream.title}</Text>
          {/* <Image source={{ uri: stream.country.flag }} /> */}
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcon name="people-alt" size={18} color="white" />
          <Text style={{ color: "white", marginLeft: 3 }}>
            {stream.viewers}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
