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
import { colors } from "../../until";
import CustomInput from "../../components/CustomInput";
import OrderList from "../../components/OrderList/OrderList";
import CustomProgressBar from "../../components/CustomProgressBar";
import { Icon } from "@rneui/themed";

const ViewOrdersScreen = ({ navigation, route }) => {
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  });

  const handleOrderDetail = useCallback((item) => {
    navigation.navigate("vieworderdetails", {
      orderDetail: item,
    });
  });

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const { orders: data = null, message = null } = await AdminService.getAllOrders();
    if (data) {
      setOrders(data);
      filter(data);
      setIsLoading(false);
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsLoading(false);
    }
  });

  const filter = useCallback((data) => {
    const keyword = filterItem;
    if (keyword.trim() !== "") {
      const results = data.filter((item) => {
        return item.user.username.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(results);
    } else {
      setFoundItems(data);
    }
  });

  useEffect(() => {
    filter(orders);
  }, [filterItem]);

  useEffect(() => {
    setIsLoading()
    fetchOrders();
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
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Order</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all orders</Text>
        </View>
      </View>
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <FlatList
        style={{ flex: 1, width: "100%", padding: 2 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        data={foundItems}
        keyExtractor={(order) => order.id.toString()}
        renderItem={({ item: order }) => (
          <OrderList item={order} onPress={() => handleOrderDetail(order)} />
        )}
        ListEmptyComponent={() => (
          <Text>{`No order found with the order # ${filterItem}!`}</Text>
        )}
      />
    </View>
  );
};

export default ViewOrdersScreen;

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
