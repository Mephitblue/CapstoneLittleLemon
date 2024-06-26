import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import debounce from "lodash.debounce";

const db = SQLite.openDatabaseSync("little_lemon");

const HomeScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const styles = Styles;
  const categories = ["Starters", "Mains", "Desserts", "Drinks", "Specials"];
  const [filterSelections, setFilterSelections] = useState(
    categories.map(() => false)
  );
  const [query, setQuery] = useState("");
  const [searchBarText, setSearchBarText] = useState("");
  const isFocused = useIsFocused();

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const createTable = () => {
    try {
      db.execSync(
        "CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, description TEXT, image TEXT, name TEXT, price REAL);"
      );
      console.log("Table created successfully");
    } catch (error) {
      console.log("Error creating table: " + error.message);
    }
  };

  const checkAndPopulateMenuItems = async () => {
    try {
      const menuItemsExist = db.getAllSync(
        "SELECT EXISTS (SELECT * FROM menu_items)"
      );
      const menuItems = db.getAllSync("SELECT * FROM menu_items");
      console.log(menuItems.length);
      if (menuItems.length == 0) {
        console.log("No menu items found");
        const data = await getMenuItemsFromAPI();
        console.log("Returned from getMenuItems: ", data);
        setMenu(data.menu);
        data.menu.forEach((item) => {
          console.log(item.category);
          console.log(item.description);
          db.runSync(
            "INSERT INTO menu_items (category, description, image, name, price) VALUES (?, ?, ?, ?, ?)",
            item.category,
            item.description,
            item.image,
            item.name,
            item.price
          );
        });
      } else {
        console.log("Menu items found");
        setMenu(menuItems);
      }
    } catch (error) {
      console.log("Error checking table: " + error.message);
    }
  };

  const getMenuItemsFromAPI = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const json = await response.json();
      console.log(json);
      return json;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getProfileData = async () => {
    try {
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const imageUri = await AsyncStorage.getItem("imageUri");
      setFirstName(firstName);
      if (lastName === null) {
        setLastName("");
      } else {
        setLastName(lastName);
      }
      setImageUri(imageUri);
    } catch (e) {}
  };

  useEffect(() => {
    getProfileData();
    createTable();
    checkAndPopulateMenuItems();
  }, [isFocused]);

  useEffect(() => {
    filterMenuItems();
    console.log("Use effect ran");
  }, [filterSelections, query]);

  const handleSelectedCategoriesChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
    console.log(filterSelections);
  };

  const filterMenuItems = async () => {
    try {
      let activeCategories = [];
      if (filterSelections.every((item) => item === false)) {
        console.log("All categories selected");
        activeCategories = categories;
      } else {
        activeCategories = categories.filter((category, index) => {
          if (filterSelections[index] === true) {
            return category;
          }
        });
      }
      const activeCategoriesString =
        "('" + activeCategories.join("','").toLowerCase() + "')";
      console.log("Active categories: ", activeCategoriesString);
      if (query === "") {
        const menuItems = db.getAllSync(
          "SELECT * FROM menu_items where category in " + activeCategoriesString
        );
        console.log("Menu items: ", menuItems);
        setMenu(menuItems);
      } else {
        console.log("Query: ", query);
        const menuItems = db.getAllSync(
          "SELECT * FROM menu_items where category in " +
            activeCategoriesString +
            " and name like '%" +
            query +
            "%' or description like '%" +
            query +
            "%'"
        );
        console.log("Menu items: ", menuItems);
        setMenu(menuItems);
      }
      console.log("Categories selected: ", activeCategories);
    } catch (error) {
      console.log("Error updating menu items: " + error.message);
    }
  };

  const CategoryFilters = ({ onChange, filterCategories, selections }) => {
    return (
      <View style={{ width: "100%", flexDirection: "row" }}>
        {filterCategories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={
              selections[index]
                ? styles.buttonStyleMenuCategoryActive
                : styles.buttonStyleMenuCategory
            }
          >
            <Text
              style={[
                styles.leadText,
                selections[index]
                  ? styles.textPrimaryColor2
                  : styles.textPrimaryColor1,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const Item = ({ name, price, description, image }) => (
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
      <View style={{ width: "85%", padding: 3, paddingTop: 0 }}>
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>{name}</Text>
        <Text style={[styles.paragraphText]}>{description}</Text>
        <Text style={[styles.cardTitle, styles.textPrimaryColor1]}>
          ${price}
        </Text>
      </View>
      <Image
        source={{ uri: image }}
        style={{
          width: 60,
          height: 60,
          padding: 10,
          marginTop: 20,
          marginLeft: 2,
        }}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price.toFixed(2)}
      description={item.description}
      category={item.category}
      image={
        "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/" +
        item.image +
        "?raw=true"
      }
    />
  );

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
      <View style={[styles.homeHeroSection, { minHeight: 30 }]}>
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
        <View
          style={[
            styles.primaryBackgroundColor1,
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingBottom: 10,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={{ paddingLeft: 5, marginLeft: 5 }}
          />
          <TextInput
            style={[
              styles.inputStyle,
              {
                width: "85%",
                height: 45,
                paddingBottom: 10,
                justifyContent: "center",
              },
            ]}
            onChangeText={(text) => handleSearchChange(text)}
            value={searchBarText}
          ></TextInput>
        </View>
        <Text
          style={[
            styles.sectionTitle,
            { paddingTop: 20, paddingBottom: 10, marginLeft: 12 },
          ]}
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
          <ScrollView horizontal={true} style={{ width: "100%" }}>
            <CategoryFilters
              selections={filterSelections}
              onChange={handleSelectedCategoriesChange}
              filterCategories={categories}
            />
          </ScrollView>
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
