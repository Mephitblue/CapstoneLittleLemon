import { StatusBar } from "expo-status-bar";
import { useContext, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { AppContext } from "../App";
import Styles from "../Styles";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Profile = () => {
  const [isOnboarded, setIsOnboarded] = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [notificationOrderStatus, setNotificationOrderStatus] = useState(false);
  const [notificationPasswordChanges, setNotificationPasswordChanges] =
    useState(false);
  const [notificationOffers, setNotificationOffers] = useState(false);
  const [notificationNewsletter, setNotificationNewsletter] = useState(false);
  const orderStatusRef = useRef();
  const passwordChangesRef = useRef();
  const offersRef = useRef();
  const newsletterRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();

  const styles = Styles;

  const handleReset = () => {
    resetData();
    setIsOnboarded(false);
  };

  const getProfileData = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
      setEmail(email);
      setFirstName(firstName);
      setLastName(lastName);
      phoneNumberRef.current.value = phoneNumber;
    } catch (e) {}
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={[
          styles.headerArea,
          {
            alignContent: "center",
            justifyContent: "center",
            padding: 15,
          },
        ]}
      >
        <Image
          title="Logo"
          source={require("../assets/Logo.png")}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
          alignItems="center"
        />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          borderColor: "#333",
          borderWidth: 1,
          borderRadius: 16,
          padding: 20,
          flexDirection: "column",
        }}
      >
        <ScrollView>
          <Text
            style={[
              styles.sectionTitle,
              styles.textPrimaryColor1,
              { marginBottom: 20 },
            ]}
          >
            Personal Information
          </Text>
          <Text style={[styles.leadText]}>First Name</Text>
          <TextInput
            style={[
              styles.inputStyle,
              {
                width: "100%",
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 30,
                borderColor: "#333",
              },
            ]}
            ref={firstNameRef}
            value={firstName}
            onChangeText={(text) => {
              text = text.trim();
              setFirstName(text);
              setFirstNameValid(validateFirstName(text));
            }}
          />
          <Text style={[styles.leadText]}>Last Name</Text>
          <TextInput
            style={[
              styles.inputStyle,
              {
                width: "100%",
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 30,
                borderColor: "#333",
              },
            ]}
            ref={lastNameRef}
            value={lastName}
            onChangeText={(text) => {
              setLasttName(text);
            }}
          />
          <Text style={[styles.leadText]}>Email</Text>
          <TextInput
            style={[
              styles.inputStyle,
              {
                width: "100%",
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 30,
                borderColor: "#333",
              },
            ]}
            ref={emailRef}
            value={email}
            onChangeText={(text) => {
              text = text.trim();
              setEmail(text);
              setEmailValid(validateEmail(text));
            }}
          />
          <Text style={[styles.leadText]}>Phone Number</Text>
          <TextInput
            style={[
              styles.inputStyle,
              {
                width: "100%",
                padding: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 30,
                borderColor: "#333",
              },
            ]}
            ref={phoneNumberRef}
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
          />
          <Text
            style={[
              styles.sectionTitle,
              styles.textPrimaryColor1,
              { marginBottom: 20 },
            ]}
          >
            Email Notifications
          </Text>
          <View style={[styles.singleCheckboxRow]}>
            <Checkbox
              title="Order Status"
              value={notificationOrderStatus}
              onValueChange={setNotificationOrderStatus}
              style={{ marginRight: 10 }}
              color={notificationOrderStatus ? "#495E57" : "#495E57"}
            />
            <Text style={[styles.leadText]}>Order statuses</Text>
          </View>
          <View style={[styles.singleCheckboxRow]}>
            <Checkbox
              title="Password Changes"
              value={notificationPasswordChanges}
              onValueChange={setNotificationPasswordChanges}
              style={{ marginRight: 10 }}
              color={notificationOrderStatus ? "#495E57" : "#495E57"}
            />
            <Text style={[styles.leadText]}>Password changes</Text>
          </View>
          <View style={[styles.singleCheckboxRow]}>
            <Checkbox
              title="Offers"
              value={notificationOffers}
              onValueChange={setNotificationOffers}
              style={{ marginRight: 10 }}
              color={notificationOrderStatus ? "#495E57" : "#495E57"}
            />
            <Text style={[styles.leadText]}>Special offers</Text>
          </View>
          <View style={[styles.singleCheckboxRow]}>
            <Checkbox
              title="Newsletter"
              value={notificationNewsletter}
              onValueChange={setNotificationNewsletter}
              style={{ marginRight: 10 }}
              color={notificationOrderStatus ? "#495E57" : "#495E57"}
            />
            <Text style={[styles.leadText]}>Newsletter</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 15,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                  { width: "100%" },
                ],
              ]}
              onPress={() => {
                handleReset();
              }}
            >
              <Text
                style={[
                  styles.leadText,
                  { textAlign: "center", width: "100%" },
                ]}
              >
                Logout
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              marginTop: 15,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                  { width: "40%" },
                ],
              ]}
              onPress={() => {
                handleReset();
              }}
            >
              <Text style={[styles.leadText, { textAlign: "center" }]}>
                Logout
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                  { width: "40%" },
                ],
              ]}
              onPress={() => {
                handleReset();
              }}
            >
              <Text
                style={[
                  styles.leadText,
                  { textAlign: "center", width: "100%" },
                ]}
              >
                Logout
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const resetData = async () => {
  try {
    await AsyncStorage.setItem("email", "");
    await AsyncStorage.setItem("firstName", "");
    await AsyncStorage.setItem("isOnboardingCompleted", JSON.stringify(false));
  } catch (e) {
    console.log(e);
  }
};
