import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { colors } from "../../until";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Icon } from "@rneui/themed";
import AuthService from "../../services/AuthService";
import CustomProgressBar from "../../components/CustomProgressBar/CustomProgressBar";
import CustomAlert from "../../components/CustomAlert";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("error");

  const handleForgetPassword = useCallback(async () => {
    setIsLoading(true);
    if (email == "") {
      setIsLoading(false);
      setAlertType("error");
      return setAlert("Please enter your email");
    }
    if (!email.includes("@")) {
      setIsLoading(false);
      setAlertType("error");
      return setAlert("Email is not valid");
    }
    if (email.length < 6) {
      setIsLoading(false);
      setAlertType("error");
      return setAlert("Email is too short");
    }
    const { data = null, message = null } = await AuthService.forgetPassword({ email })
    if (data) {
      setIsLoading(false);
      setAlertType("success");
      setAlert(data);
    } else {
      setIsLoading(false);
      setAlertType("error");
      setAlert(message);
    }
  });
  return (
    <View style={styles.container}>
      <CustomProgressBar visible={isLoading} label={"Send Mail..."} />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Reset Password</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Enter the email associated with your account and we'll send an email
            with instruction to reset the password.
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomAlert message={alert} type={alertType} />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={"Enter your Email Address"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
      </View>
      <CustomButton
        text={"Send Instruction"}
        onPress={handleForgetPassword}
        radius={5}
      />
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
  },
});
