import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import React, { useCallback, useState } from "react";
import { colors, setAuthUser } from "../../until";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/logo.png";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";
import CustomProgressBar from "../../components/CustomProgressBar";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandle = useCallback(async () => {
    setIsLoading(true);

    if (username === "") {
      setIsLoading(false);
      return setError("Please enter your username");
    }
    if (password === "") {
      setIsLoading(false);
      return setError("Please enter your password");
    }

    if (password.length < 6) {
      setIsLoading(false);
      return setError("Password must be 6 characters long");
    }

    const { user = null, message = null } = await AuthService.login({ username, password })
    if (user) {
      setIsLoading(false);
      setAuthUser(user);
      navigation.replace(user.role === "ROLE_ADMIN" ? "dashboard" : "tab");
    } else {
      setIsLoading(false);
      setError(message);
    }
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <CustomProgressBar visible={isLoading} label={"Login ..."} />
        <StatusBar></StatusBar>
        <View style={styles.welconeContainer}>
          <View>
            <Text style={styles.welcomeText}>Welcome to PaoShop</Text>
            <Text style={styles.welcomeParagraph}>
              make your ecommerce easy
            </Text>
          </View>
          <View>
            <Image style={styles.logo} source={header_logo} />
          </View>
        </View>
        <View style={styles.screenNameContainer}>
          <Text style={styles.screenNameText}>Login</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomAlert message={error} type={"error"} />
          <CustomInput
            value={username}
            setValue={setUsername}
            placeholder={"Username"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            placeholder={"Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <View style={styles.forgetPasswordContainer}>
            <Text
              onPress={() => navigation.navigate("forgetpassword")}
              style={styles.ForgetText}
            >
              Forget Password?
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Login"} onPress={loginHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Don't have an account?</Text>
        <Text
          onPress={() => navigation.navigate("signup")}
          style={styles.signupText}
        >
          Register
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    // padding:15
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.muted,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});

export default LoginScreen;
