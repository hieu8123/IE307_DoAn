import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, getAuthUser } from "../../until";
import CustomAlert from "../../components/CustomAlert";
import CustomProgressBar from "../../components/CustomProgressBar";
import OrderList from "../../components/OrderList/OrderList";
import { UserService } from "../../services";
import { Icon } from "@rneui/themed";

const MyOrderScreen = ({ navigation, route }) => {
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [UserInfo, setUserInfo] = useState({});

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  });

  const handleOrderDetail = useCallback((item) => {
    navigation.navigate("myorderdetail", {
      orderDetail: item,
    });
  });

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const { orders: orderDatas = null, message = null } = await UserService.getAllOrdersByUser();
    if (orderDatas) {
      setIsLoading(false);
      setOrders(orderDatas);
      setError("");
    } else {
      setIsLoading(false);
      setError(message);
      if (message == 'jwt expired') logout(navigation);
    }
  });

  const fetchUser = useCallback(async () => {
    const user = await getAuthUser();
    setUserInfo(user);
  })
  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <CustomProgressBar visible={isloading} label={'Please wait...'} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
        <View></View>
        <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Icon name="shopping-cart" type="font-awesome-5" size={30} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Orders</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Your order and your order status
          </Text>
        </View>
      </View>
      <CustomAlert message={error} type={'error'} />
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderList item={item} onPress={() => handleOrderDetail(item)} />
        )}
        style={{ flex: 1, width: "100%", padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.ListContiainerEmpty}>
            <Text style={styles.secondaryTextSmItalic}>
              "There are no orders placed yet."
            </Text>
          </View>
        }
        ListFooterComponent={<View style={styles.emptyView} />} />

    </View>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
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
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
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
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  emptyView: {
    height: 20,
  },
  ListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
});
