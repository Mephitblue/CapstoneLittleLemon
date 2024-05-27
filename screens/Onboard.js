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
        <Text style={[styles.sectionTitle, { padding: 20 }]}>
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
            console.log(text);
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
          style={
            emailValid && firstNameValid
              ? [styles.buttonStyle1, styles.buttonStyle1Active]
              : [styles.buttonStyle1, styles.buttonStyle1Disabled]
          }
          disabled={!emailValid || !firstNameValid}
          onPress={() => {
            setIsOnboarded(true);
          }}
        >
          <Text
            style={
              emailValid && firstNameValid
                ? [
                    styles.leadText,
                    styles.buttonStyle1Active,
                    { textAlign: "center" },
                  ]
                : [
                    styles.leadText,
                    styles.textDisabledColor,
                    { textAlign: "center" },
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

export default Onboard;
