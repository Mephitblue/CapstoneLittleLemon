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
  const [imageUri, setImageUri] = useState("");
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
      <View style={[styles.navigationArea]}>
        <Ionicons name="arrow-back-circle-sharp" size={70} color="gray" />
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
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                  { width: "30%", justifyContent: "center" },
                ],
              ]}
              onPress={pickImage}
            >
              <Text style={[styles.leadText, { textAlign: "center" }]}>
                Change
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                  { width: "30%", justifyContent: "center" },
                ],
              ]}
              onPress={() => {
                setImageUri(null);
              }}
            >
              <Text
                style={[
                  styles.leadText,
                  {
                    textAlign: "center",
                    width: "100%",
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
          <TextInput
            style={[styles.inputStyle, styles.inputStyleProfileInfo]}
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
                  { width: "35%" },
                ],
              ]}
              onPress={() => {
                handleReset();
              }}
            >
              <Text style={[styles.leadText, { textAlign: "center" }]}>
                Discard Changes
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                [
                  styles.buttonStyle1,
                  pressed
                    ? styles.buttonStyle1Clicked
                    : styles.buttonStyle1Active,
                  { width: "35%" },
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
                Save Changes
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
