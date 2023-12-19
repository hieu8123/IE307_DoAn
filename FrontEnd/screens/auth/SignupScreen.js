import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { colors, setAuthUser } from "../../until";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/logo.png";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomProgressBar from "../../components/CustomProgressBar";
import { AuthService } from "../../services";
import { Icon } from "@rneui/themed";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUpHandle = useCallback(async () => {
    setIsLoading(true);
    if (email == "") {
      setIsLoading(false);
      return setError("Please enter your email");
    }
    if (username == "") {
      setIsLoading(false);
      return setError("Please enter your name");
    }
    if (password == "") {
      setIsLoading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsLoading(false);
      return setError("Email is not valid");
    }
    if (email.length < 6) {
      setIsLoading(false);
      return setError("Email is too short");
    }
    if (password.length < 5) {
      setIsLoading(false);
      return setError("Password must be 6 characters long");
    }
    if (password != confirmPassword) {
      setIsLoading(false);
      return setError("password does not match");
    }

    const {user = null, message = null} = await AuthService.signup({username, password, email})
    if(user){
      setIsLoading(false);
      setAuthUser(user);
      navigation.replace(user.role === "ROLE_ADMIN" ? "dashboard" : "tab");
    }else{
      setIsLoading(false);
      setError(message);
    }
  });
  return (
    <KeyboardAvoidingView style={styles.container} >
      <CustomProgressBar visible={isLoading} label={"Signup..."} />
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} fle>
        <View style={styles.welcomeContainer}>
          <Image style={styles.logo} source={header_logo} />
        </View>
        <View style={styles.screenNameContainer}>
          <View>
            <Text style={styles.screenNameText}>Sign up</Text>
          </View>
          <View>
            <Text style={styles.screenNameParagraph}>
              Create your account on EasyBuy to get an access to millions of
              products
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <CustomAlert message={error} type={"error"} />
          <CustomInput
            value={username}
            setValue={setUsername}
            placeholder={"Name"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder={"Email"}
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
          <CustomInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
            placeholder={"Confirm Password"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Sign up"} onPress={signUpHandle} />
      </View>
      <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate("login")}
          style={styles.signupText}
        >
          Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcomeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  formContainer: {
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
  buttonContainer: {
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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
});
