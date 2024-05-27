import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

const Profile = () => {
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
