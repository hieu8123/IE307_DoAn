import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { colors } from "../../until";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";
import { AuthService } from "../../services";
import { Icon } from "@rneui/themed";

const UpdatePasswordScreen = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setCconfirmPassword] = useState("");
  const [alertType, setAlertType] = useState("error");

  const updatePasswordHandle = useCallback(async () => {
    if (currentPassword == newPassword) {
      setError("You are not allowed to set the previous used password");
      return;
    }
    if (newPassword != confirmPassword) {
      setError("Password not matched");
      return;
    }
    const { data = null, message = null } = await AuthService.changePassword({ currentPassword, newPassword });
    if (data) {
      setAlertType("success");
      setError("Password is updated successfully ");
    } else {
      setAlertType("error");
      setError(message);
      if(message == 'jwt expired') logout(navigation);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" size={30} type="ionicon" color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Update Password</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Your new password must be different from previous used password
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomAlert message={error} type={alertType} />
        <CustomInput
          value={currentPassword}
          setValue={setCurrentPassword}
          placeholder={"Current Password"}
          secureTextEntry={true}
        />
        <CustomInput
          value={newPassword}
          setValue={setNewPassword}
          placeholder={"New Password"}
          secureTextEntry={true}
        />
        <CustomInput
          value={confirmPassword}
          setValue={setCconfirmPassword}
          placeholder={"Confirm New Password"}
          secureTextEntry={true}
        />
      </View>
      <CustomButton
        text={"Update Password"}
        onPress={updatePasswordHandle}
        radius={5}
      />
    </View>
  );
};

export default UpdatePasswordScreen;

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
