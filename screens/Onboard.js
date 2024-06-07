import { StatusBar } from "expo-status-bar";
import { useContext, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../App";
import Styles from "../Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { validateEmail, validateFirstName } from "../utils/index.js";

const Onboard = () => {
  const styles = Styles;
  const [isOnboarded, setIsOnboarded] = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const emailRef = useRef();
  const firstNameRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(false);

  const handleOnboarding = () => {
    storeData(email, firstName, true);
    setIsOnboarded(true);
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.headerArea]}>
        <Image
          title="Logo"
          source={require("../assets/Logo.png")}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <View style={[styles.onboardingFormArea, styles.primaryBackgroundColor1]}>
        <Text
          style={[
            styles.sectionTitle,
            { padding: 20, width: "100%", textAlign: "center" },
          ]}
        >
          Let us get to know you
        </Text>

        <Text style={[styles.leadText]}>First Name</Text>
        <TextInput
          style={styles.inputStyle}
          ref={firstNameRef}
          value={firstName}
          width={"80%"}
          onChangeText={(text) => {
            text = text.trim();
            setFirstName(text);
            setFirstNameValid(validateFirstName(text));
          }}
        />
        <Text style={[styles.leadText]}>Email</Text>
        <TextInput
          style={styles.inputStyle}
          width={"80%"}
          ref={emailRef}
          value={email}
          onChangeText={(text) => {
            text = text.trim();
            setEmail(text);
            setEmailValid(validateEmail(text));
          }}
        />
      </View>
      <View style={[styles.onboardingFooterArea]}>
        <Pressable
          title="Next"
          style={({ pressed }) => [
            emailValid && firstNameValid
              ? [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                ]
              : [styles.buttonStyle1Disabled, styles.buttonStyle1],
          ]}
          disabled={!emailValid || !firstNameValid}
          onPress={() => {
            handleOnboarding();
          }}
        >
          <Text
            style={
              emailValid && firstNameValid
                ? [styles.leadText, { textAlign: "center", width: "80%" }]
                : [
                    styles.leadText,
                    styles.textDisabledColor,
                    {
                      textAlign: "center",
                      width: "80%",
                    },
                  ]
            }
          >
            NEXT
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const storeData = async (email, firstName, OnboardingCompleted) => {
  try {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("firstName", firstName);
    await AsyncStorage.setItem(
      "isOnboardingCompleted",
      JSON.stringify(OnboardingCompleted)
    );
  } catch (e) {
    console.log(e);
  }
};

export default Onboard;
