import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import OptionList from "../../components/OptionList/OptionList";
import { colors, getAuthUser, logout } from "../../until";
import { AuthService } from "../../services";
import { Icon } from "@rneui/themed";

const MyAccountScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove your account?",
      [
        {
          text: "Yes",
          onPress: () => {
            DeleteAccontHandle();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const DeleteAccontHandle = useCallback(async () => {
    const { data = null, message = null } = await AuthService.deleteUser();
    if(data){
      logout(navigation);
    }else{
    }
  });
  const fetchUser = useCallback(async () => {
    const user = await getAuthUser();
    setUserInfo(user);
  })
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
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
        <Text style={styles.screenNameText}>My Account</Text>
      </View>
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          name={userInfo.username}
          email={userInfo.email}
        />
      </View>
      <View style={styles.OptionsContainer}>
        <OptionList
          text={"Change Password"}
          iconName={"key-sharp"}
          onPress={
            () =>
              navigation.navigate("updatepassword")
          }
        />
        <OptionList
          text={"Delete My Account"}
          iconName={"trash-bin-sharp"}
          type={"danger"}
          onPress={() => showConfirmDialog()}
        />
      </View>
    </View>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
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
  UserProfileCardContianer: {
    width: "100%",
    height: "25%",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  OptionsContainer: {
    width: "100%",
  },
});
