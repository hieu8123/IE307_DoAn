import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, logout } from "../../until";
import CustomCard from "../../components/CustomCard/CustomCard";
import OptionList from "../../components/OptionList/OptionList";
import CustomProgressBar from "../../components/CustomProgressBar";
import { AdminService } from "../../services";
import { Icon } from "@rneui/themed";

const DashboardScreen = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [refeshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    const { data: ListDashBoard = null, message = null } = await AdminService.getDashBoard();
    if (ListDashBoard) {
      setData([
        {
          id: 1,
          title: "Users",
          value: ListDashBoard.usersCount,
          iconName: "person",
          type: "parimary",
          screenName: "viewusers",
        },
        {
          id: 2,
          title: "Orders",
          value: ListDashBoard.ordersCount,
          iconName: "cart",
          type: "secondary",
          screenName: "vieworder",
        },
        {
          id: 3,
          title: "Products",
          value: ListDashBoard.productsCount,
          iconName: "md-square",
          type: "warning",
          screenName: "viewproduct",
        },
        {
          id: 4,
          title: "Brands",
          value: ListDashBoard.brandsCount,
          iconName: "menu",
          type: "muted",
          screenName: "viewbrands",
        },
      ]);
      setIsloading(false);
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsloading(false);
    }

  });

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStats();
    setRefreshing(false);
  });

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <CustomProgressBar visible={isloading} label={'Loading...'} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={async () => logout(navigation)}
        >
          <Icon name="log-out" type="ionicon" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View>
          <Text style={styles.toBarText}>Dashboard</Text>
        </View>
        <TouchableOpacity>
          <Icon
            name="person-circle-outline"
            type="ionicon"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Icon type="material-community" name="menu-right" size={30} color="black" />
        <Text style={styles.headingText}>Welcome, Admin</Text>
      </View>
      <View style={{ height: 370 }}>
        {data && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refeshing}
                onRefresh={handleOnRefresh}
              />
            }
            contentContainerStyle={styles.cardContainer}
          >
            {data.map((data) => (
              <CustomCard
                key={data.id}
                iconName={data.iconName}
                title={data.title}
                value={data.value}
                type={data.type}
                onPress={() => {
                  navigation.navigate(data.screenName);
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.headingContainer}>
        <Icon type="material-community" name="menu-right" size={30} color="black" />
        <Text style={styles.headingText}>Actions</Text>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <ScrollView style={styles.actionContainer}>
          <OptionList
            text={"Products"}
            iconName={"md-square"}
            onPress={() =>
              navigation.navigate("viewproduct")
            }
            onPressSecondary={() =>
              navigation.navigate("addproduct")
            }
            type="morden"
          />
          <OptionList
            text={"Brands"}
            iconName={"menu"}
            onPress={() =>
              navigation.navigate("viewbrands")
            }
            onPressSecondary={() =>
              navigation.navigate("addbrands")
            }
            type="morden"
          />
          <OptionList
            text={"Orders"}
            iconName={"cart"}
            onPress={() =>
              navigation.navigate("vieworder")
            }
            type="morden"
          />
          <OptionList
            text={"Users"}
            iconName={"person"}
            onPress={() =>
              navigation.navigate("viewusers")
            }
            type="morden"
          />

          <View style={{ height: 20 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: colors.muted,
    fontWeight: "800",
  },
  actionContainer: { padding: 20, width: "100%", flex: 1 },
});
