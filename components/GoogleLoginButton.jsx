import React from "react";
import { Button } from "react-native-paper";

export function GoogleLoginButton() {
  return (
    <Button
      icon="google"
      mode="contained"
      style={{
        width: 300,
        height: 50,
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#DB4437",
        borderRadius: 10,
      }}
      onPress={() => console.log("Pressed")}
    >
      Continue with Google
    </Button>
  );
}
