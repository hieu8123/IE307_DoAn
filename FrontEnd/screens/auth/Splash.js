import { StyleSheet, Image, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import logo from "../../assets/logo/logo_white.png";
import { colors, getAuthUser, setAuthUser } from "../../until";

const Splash = ({ navigation }) => {
  const retrieveData = useCallback(async () => {
    const user = await getAuthUser();
    if (user !== null) {
      setTimeout(() => {
        navigation.replace(user.role === "ROLE_ADMIN" ? "dashboard" : "tab");
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.replace("login");
      }, 2000);
    }
  });

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    color: colors.light,
    fontSize: 50,
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
});

export default Splash;