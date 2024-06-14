import { StyleSheet } from "react-native";
import React from "react";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
  headerArea: {
    flex: 0.1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEFEE",
  },
  navigationArea: {
    flex: 0.1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEFEE",
    paddingBottom: 5,
    paddingRight: 8,
  },
  navAvitarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  onboardingFormArea: {
    flex: 0.75,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  onboardingFooterArea: {
    flex: 0.15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEFEE",
  },
  profileInformationArea: {
    flex: 1,
    width: "100%",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    flexDirection: "column",
  },
  profileInfoAvitarSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    marginBottom: 25,
  },
  primaryBackgroundColor1: {
    backgroundColor: "#495E57",
  },
  primaryBackgroundColor2: {
    backgroundColor: "#F4CE14",
  },
  buttonStyle1: {
    borderRadius: 16,
    alignItems: "center",
    alignContent: "center",
    padding: 10,
    margin: 10,
    width: "50%",
    borderWidth: 1,
    borderColor: "#333333",
  },
  buttonStyle1Active: {
    backgroundColor: "#F4CE14",
    color: "#333333",
  },
  buttonStyle1Clicked: {
    backgroundColor: "#495E57",
    color: "#EDEFEE",
  },
  buttonStyle2Active: {
    backgroundColor: "#495E57",
    color: "#EDEFEE",
  },
  buttonStyle2Clicked: {
    backgroundColor: "#F4CE14",
    color: "#333333",
  },
  buttonStyle3Active: {
    backgroundColor: "#495E57",
    Color: "#EDEFEE",
  },
  buttonStyle3Clicked: {
    backgroundColor: "#F4CE14",
    color: "#333333",
  },
  buttonStyle4Active: {
    backgroundColor: "#EDEFEE",
    borderColor: "#495E57",
    color: "#495E57",
  },
  buttonStyle4Clicked: {
    backgroundColor: "#F4CE14",
    color: "#333333",
  },
  buttonStyle1Disabled: {
    backgroundColor: "#BBB",
    color: "#333333",
  },
  buttonStyleMenuCategory: {
    borderRadius: 16,
    alignItems: "center",
    alignContent: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#bcccc7",
  },
  textPrimaryColor1: {
    color: "#495E57",
  },
  textPrimaryColor2: {
    color: "#F4CE14",
  },
  textPrimaryColor3: {
    color: "#EDEFEE",
  },
  textDisabledColor: { color: "#999999" },
  inputStyle: {
    borderRadius: 16,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#EDEFEE",
  },
  inputStyleProfileInfo: {
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 30,
    borderColor: "#333",
  },
  displayTitle: {
    fontFamily: "MarkaziText_500Medium",
    fontSize: 64,
    marginBottom: -10,
  },
  subtitle: {
    fontFamily: "MarkaziText_400Regular",
    fontSize: 40,
    marginTop: -10,
  },
  leadText: {
    fontFamily: "Karla_500Medium",
    fontSize: 18,

    //fontWeight: "medium",
  },
  sectionTitle: {
    fontFamily: "Karla_800ExtraBold",
    fontSize: 20,
    //fontWeight: "extrabold",
  },
  sectionCategory: {
    fontFamily: "Karla_800ExtraBold",
    fontSize: 16,
    //fontWeight: "extrabold",
  },
  cardTitle: {
    fontFamily: "Karla_700Bold",
    fontSize: 18,
    //fontWeight: "bold",
  },
  paragraphText: {
    fontFamily: "Karla_400Regular",
    fontSize: 16,
    //fontWeight: "regular",
  },
  highlightText: {
    fontFamily: "Karla_500Medium",
    fontSize: 16,
    //fontWeight: "medium",
  },
  navArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: 10,
  },
  singleCheckboxRow: {
    flexDirection: "row",
    justifyContent: "right",
    marginBottom: 20,
  },
  homeHeroSection: {
    flex: 0.35,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#495E57",
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 10,
  },
  homeMenuSection: {
    flex: 0.55,

    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#EDEFEE",
    paddingHorizontal: 15,
    paddingTop: 5,
  },
});

export default Styles;
