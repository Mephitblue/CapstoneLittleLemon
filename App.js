import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useAnimatedValue } from "react-native";
import React, { useContext } from "react";
import Onboard from "./Onboard";
import Profile from "./Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import {
  useFonts,
  Karla_400Regular,
  Karla_500Medium,
  Karla_700Bold,
  Karla_800ExtraBold,
} from "@expo-google-fonts/karla";

import {
  MarkaziText_400Regular,
  MarkaziText_500Medium,
} from "@expo-google-fonts/markazi-text";

const Stack = createNativeStackNavigator();
export const AppContext = createContext();

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_500Medium,
    Karla_700Bold,
    Karla_800ExtraBold,
    MarkaziText_400Regular,
    MarkaziText_500Medium,
  });

  const [isOnboarded, setIsOnboarded] = useState(false);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <AppContext.Provider value={[isOnboarded, setIsOnboarded]}>
        <Stack.Navigator>
          {isOnboarded ? (
            <Stack.Screen name="Profile" component={Profile} />
          ) : (
            <Stack.Screen name="Onboard" component={Onboard} />
          )}
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
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
