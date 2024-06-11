import { useContext, useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { AppContext } from "../App";
import Styles from "../Styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notificationOrderStatus, setNotificationOrderStatus] = useState(false);
  const [notificationPasswordChanges, setNotificationPasswordChanges] =
    useState(false);
  const [notificationOffers, setNotificationOffers] = useState(false);
  const [notificationNewsletter, setNotificationNewsletter] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [menu, setMenu] = useState([]);
  const styles = Styles;

  const getProfileData = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
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
      setFirstName(firstName);
      if (lastName === null) {
        setLastName("");
      } else {
        setLastName(lastName);
      }
      if (phoneNumber === null) {
        setPhoneNumber("");
      } else {
        setPhoneNumber(phoneNumber);
      }
      setPhoneNumber(phoneNumber);
      setNotificationOrderStatus(JSON.parse(notificationOrderStatus));
      setNotificationPasswordChanges(JSON.parse(notificationPasswordChanges));
      setNotificationOffers(JSON.parse(notificationOffers));
      setNotificationNewsletter(JSON.parse(notificationNewsletter));
      setImageUri(imageUri);
    } catch (e) {}
  };

  const getMenuItemsFronAPI = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const json = await response.json();
      console.log(json);
      setMenu(json.menu);
    } catch (e) {
      console.log(e);
    }
  };

  const Item = ({ name, price, description, category, image }) => (
    <View
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
      }}
    >
      <View style={{ width: "85%" }}>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Text>$ {price}</Text>
      </View>
      <Image source={{ uri: image }} style={{ width: 60, height: 60 }} />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price}
      description={item.description}
      category={item.category}
      image={
        "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/" +
        item.image +
        "?raw=true"
      }
    />
  );

  useEffect(() => {
    getProfileData();
    getMenuItemsFronAPI();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.navigationArea]}>
        <View
          style={[
            styles.navAvitarCircle,
            {
              backgroundColor: "#EDEFEE",
            },
          ]}
        ></View>
        <Image
          title="Logo"
          source={require("../assets/Logo.png")}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
          alignItems="center"
        />
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          title="Edit Profile"
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={[styles.navAvitarCircle]}
            />
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
        </Pressable>
      </View>
      <View style={[styles.homeHeroSection]}>
        <Text style={[styles.displayTitle, styles.textPrimaryColor2]}>
          Little Lemon
        </Text>

        <View
          style={[
            {
              flexDirection: "row",
              alignSelf: "flex-start",
              width: "100%",
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={[
              {
                width: "60%",
                alignSelf: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <Text style={[styles.subtitle, styles.textPrimaryColor3]}>
              Chicago
            </Text>
            <Text
              style={[
                styles.paragraphText,
                styles.textPrimaryColor3,
                { paddingRight: 10 },
              ]}
            >
              We are a family owned Mediterranean restauant, focused on
              traditional recipes searvd with a modern twist
            </Text>
          </View>

          <View
            style={[
              {
                width: "40%",
                alignSelf: "flex-end",
                paddingTop: 10,
                marginRight: -5,
              },
            ]}
          >
            <Image
              style={[{ width: 160, height: 180, borderRadius: 16 }]}
              title="delicious food"
              source={require("../assets/HeroImage.png")}
              resizeMode="cover"
              accessible={true}
            />
          </View>
        </View>
      </View>
      <View style={[styles.homeMenuSection]}>
        <Text
          style={[styles.sectionTitle, { paddingTop: 20, paddingBottom: 10 }]}
        >
          ORDER FOR DELIVERY!
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 15,
          }}
        >
          <Pressable style={[styles.buttonStyleMenuCategory]}>
            <Text style={[styles.leadText, styles.textPrimaryColor1]}>
              Starters
            </Text>
          </Pressable>
          <Pressable style={[styles.buttonStyleMenuCategory]}>
            <Text style={[styles.leadText, styles.textPrimaryColor1]}>
              Mains
            </Text>
          </Pressable>
          <Pressable style={[styles.buttonStyleMenuCategory]}>
            <Text style={[styles.leadText, styles.textPrimaryColor1]}>
              Desserts
            </Text>
          </Pressable>
          <Pressable style={[styles.buttonStyleMenuCategory]}>
            <Text style={[styles.leadText, styles.textPrimaryColor1]}>
              Drinks
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            borderBottomColor: "#AAA",
            borderBottomWidth: 2,
            alignSelf: "stretch",
          }}
        />
        <FlatList data={menu} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;