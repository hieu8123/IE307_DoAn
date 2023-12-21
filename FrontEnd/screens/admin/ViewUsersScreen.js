import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors } from "../../until";
import CustomInput from "../../components/CustomInput/";
import CustomProgressBar from "../../components/CustomProgressBar";
import UserList from "../../components/UserList/UserList";
import { AdminService } from "../../services";
import { Icon } from "@rneui/themed";

const ViewUsersScreen = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const fetchUsers = useCallback(async () => {
    setIsloading(true);
    const { users: data = null, message = null } = await AdminService.getAllUser();
    if (data) {
      setUsers(data);
      filter(data);
      setIsloading(false);
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsloading(false);
    }
  });

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchUsers();
    setRefreshing(false);
  };

  const filter = useCallback((data) => {
    const keyword = filterItem;
    if (keyword.trim() !== "") {
      const results = data.filter((user) => {
        return user.username.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(results);
    } else {
      setFoundItems(data);
    }
  });

  useEffect(() => {
    filter(users);
  }, [filterItem]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <CustomProgressBar visible={isloading} label={'Loading...'} />
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
        <TouchableOpacity disabled>
          <Icon name="user" type="font-awesome-5" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Users</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all Users</Text>
        </View>
      </View>
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {foundItems && foundItems.length == 0 ? (
          <Text>{`No user found with the name of ${filterItem}!`}</Text>
        ) : (
          foundItems.map((item) => (
            <UserList
              key={item.id}
              username={item.username}
              email={item.email}
              role={item.role}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ViewUsersScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
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