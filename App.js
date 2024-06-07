import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useAnimatedValue } from "react-native";
import React, { useContext, useEffect } from "react";
import Onboard from "./screens/Onboard";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIfOnboarded = async () => {
    try {
      const onboarded = await AsyncStorage.getItem("isOnboardingCompleted");
      setIsOnboarded(JSON.parse(onboarded));
      if (onboarded !== null) {
        setIsOnboarded(JSON.parse(onboarded));
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    checkIfOnboarded();
  }, []);

  if (!fontsLoaded || isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <AppContext.Provider value={[isOnboarded, setIsOnboarded]}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
