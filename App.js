import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useAnimatedValue } from "react-native";
import React, { useContext } from "react";
import Onboard from "./Onboard";
import Profile from "./Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";

const Stack = createNativeStackNavigator();

export const AppContext = createContext();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <AppContext.Provider value={[isOnboarded, setIsOnboarded]}>
      <NavigationContainer>
        <Stack.Navigator>
          {isOnboarded ? (
            <Stack.Screen name="Profile" component={Profile} />
          ) : (
            <Stack.Screen name="Onboard" component={Onboard} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
