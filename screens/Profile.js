import { useContext, useState, useRef, useEffect } from "react";
import {
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
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaskedTextInput } from "react-native-mask-text";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
} from "../utils/index.js";

const Profile = ({ navigation }) => {
  const [isOnboarded, setIsOnboarded] = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [notificationOrderStatus, setNotificationOrderStatus] = useState(false);
  const [notificationPasswordChanges, setNotificationPasswordChanges] =
    useState(false);
  const [notificationOffers, setNotificationOffers] = useState(false);
  const [notificationNewsletter, setNotificationNewsletter] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();

  const styles = Styles;

  const handleReset = () => {
    resetData();
    setIsOnboarded(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getProfileData = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      if (lastName == null) {
        setLastName("");
      }
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
      if (phoneNumber == null) {
        setPhoneNumber("");
      }
      const notificationOrderStatus = await AsyncStorage.getItem(
        "notificationOrderStatus"
      );
      const notificationPasswordChanges = await AsyncStorage.getItem(
        "notificationPasswordChanges"
      );
      const notificationOffers = await AsyncStorage.getItem(
        "notificationOffers"
      );
      const notificationNewsletter = await AsyncStorage.getItem(
        "notificationNewsletter"
      );
      const imageUri = await AsyncStorage.getItem("imageUri");
      setEmail(email);
      if (email != null) {
        setEmailValid(true);
      }
      setFirstName(firstName);
      if (firstName != null) {
        setFirstNameValid(true);
      }
      setLastName(lastName);
      if (lastName != null) {
        setLastNameValid(true);
      }
      setPhoneNumber(phoneNumber);
      if (phoneNumber != null) {
        setPhoneNumberValid(true);
      }
      setNotificationOrderStatus(JSON.parse(notificationOrderStatus));
      setNotificationPasswordChanges(JSON.parse(notificationPasswordChanges));
      setNotificationOffers(JSON.parse(notificationOffers));
      setNotificationNewsletter(JSON.parse(notificationNewsletter));
      setImageUri(imageUri);
    } catch (e) {}
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.navigationArea]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-circle-sharp" size={60} color="#495E57" />
        </Pressable>
        <Image
          title="Logo"
          source={require("../assets/Logo.png")}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
          alignItems="center"
        />
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={[styles.navAvitarCircle]} />
        ) : (
          <View
            style={[
              styles.navAvitarCircle,
              {
                backgroundColor: "lightgray",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              {firstName ? firstName.charAt(0).toUpperCase() : ""}
              {lastName ? lastName.charAt(0).toUpperCase() : ""}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.profileInformationArea]}>
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
          <View style={styles.profileInfoAvitarSelection}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  overflow: "hidden",
                }}
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "lightgray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24, color: "white" }}>
                  {firstName ? firstName.charAt(0).toUpperCase() : ""}
                  {lastName ? lastName.charAt(0).toUpperCase() : ""}
                </Text>
              </View>
            )}
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle2Clicked
                    : styles.buttonStyle2Active,
                  { width: "30%", justifyContent: "center" },
                ],
              ]}
              onPress={pickImage}
            >
              <Text
                style={[
                  styles.leadText,
                  { textAlign: "center", color: "#EDEFEE" },
                ]}
              >
                Change
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle4Clicked
                    : styles.buttonStyle4Active,
                  { width: "30%", justifyContent: "center" },
                ],
              ]}
              onPress={() => {
                setImageUri("");
              }}
            >
              <Text
                style={[
                  styles.leadText,
                  {
                    textAlign: "center",
                    width: "100%",
                    color: "#495E57",
                  },
                ]}
              >
                Remove
              </Text>
            </Pressable>
          </View>
          <Text style={[styles.leadText]}>First Name</Text>
          <TextInput
            style={[styles.inputStyle, styles.inputStyleProfileInfo]}
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
            style={[styles.inputStyle, styles.inputStyleProfileInfo]}
            ref={lastNameRef}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameValid(validateLastName(text));
            }}
          />
          <Text style={[styles.leadText]}>Email</Text>
          <TextInput
            style={[styles.inputStyle, styles.inputStyleProfileInfo]}
            ref={emailRef}
            value={email}
            onChangeText={(text) => {
              text = text.trim();
              setEmail(text);
              setEmailValid(validateEmail(text));
            }}
          />
          <Text style={[styles.leadText]}>Phone Number</Text>
          <MaskedTextInput
            style={[styles.inputStyle, styles.inputStyleProfileInfo]}
            ref={phoneNumberRef}
            value={phoneNumber}
            mask="(999) 999-9999"
            keyboardType="numeric"
            onChangeText={(text, rawText) => {
              setPhoneNumber(rawText);
              setPhoneNumberValid(validatePhoneNumber(rawText));
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
                    ? styles.buttonStyle4Clicked
                    : styles.buttonStyle4Active,
                  { width: "35%" },
                ],
              ]}
              onPress={() => {
                getProfileData();
              }}
            >
              <Text
                style={[
                  styles.leadText,
                  { textAlign: "center", color: "#495E57" },
                ]}
              >
                {"Discard\nChanges"}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                emailValid && firstNameValid
                  ? [
                      styles.buttonStyle1,
                      pressed
                        ? styles.buttonStyle2Clicked
                        : styles.buttonStyle2Active,
                      { width: "35%" },
                    ]
                  : [
                      styles.buttonStyle1Disabled,
                      styles.buttonStyle1,
                      { width: "35%" },
                    ],
              ]}
              disabled={!emailValid || !firstNameValid}
              onPress={() => {
                updateData(
                  email,
                  firstName,
                  lastName,
                  phoneNumber,
                  notificationNewsletter,
                  notificationOffers,
                  notificationOrderStatus,
                  notificationPasswordChanges,
                  imageUri
                );
              }}
            >
              <Text
                style={[
                  styles.leadText,
                  { textAlign: "center", color: "#EDEFEE" },
                ]}
              >
                {"Save\nChanges"}
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
    await AsyncStorage.setItem("lastName", "");
    await AsyncStorage.setItem("phoneNumber", "");
    await AsyncStorage.setItem(
      "notificationOrderStatus",
      JSON.stringify(false)
    );
    await AsyncStorage.setItem(
      "notificationPasswordChanges",
      JSON.stringify(false)
    );
    await AsyncStorage.setItem("notificationOffers", JSON.stringify(false));
    await AsyncStorage.setItem("notificationNewsletter", JSON.stringify(false));
    await AsyncStorage.setItem("imageUri", "");
  } catch (e) {
    console.log(e);
  }
};

const updateData = async (
  email,
  firstName,
  lastName,
  phoneNumber,
  notificationNewsletter,
  notificationOffers,
  notificationOrderStatus,
  notificationPasswordChanges,
  imageUri
) => {
  try {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("firstName", firstName);
    if (lastName !== null || lastName !== "") {
      lastName = lastName.trim();
    }
    await AsyncStorage.setItem("lastName", lastName);
    if (phoneNumber !== null) {
      await AsyncStorage.setItem("phoneNumber", phoneNumber);
    }
    await AsyncStorage.setItem(
      "notificationOrderStatus",
      JSON.stringify(notificationOrderStatus)
    );
    await AsyncStorage.setItem(
      "notificationPasswordChanges",
      JSON.stringify(notificationPasswordChanges)
    );
    await AsyncStorage.setItem(
      "notificationOffers",
      JSON.stringify(notificationOffers)
    );
    await AsyncStorage.setItem(
      "notificationNewsletter",
      JSON.stringify(notificationNewsletter)
    );
    if (imageUri !== null) {
      await AsyncStorage.setItem("imageUri", imageUri);
    }
  } catch (e) {
    console.log(e);
  }
};
