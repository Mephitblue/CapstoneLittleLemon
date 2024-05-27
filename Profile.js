import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { AppContext } from "./App";

const Profile = () => {
  const [isOnboarded, setIsOnboarded] = useContext(AppContext);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Profile</Text>
      <Pressable
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={() => {
          setIsOnboarded(false);
        }}
      >
        <Text>Profile</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
