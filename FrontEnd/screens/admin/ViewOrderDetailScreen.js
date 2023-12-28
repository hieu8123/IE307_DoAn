import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, dateFormat } from "../../until";
import CustomProgressBar from "../../components/CustomProgressBar";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import CustomButton from "../../components/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import { AdminService } from "../../services";
import { Icon } from "@rneui/themed";

const ViewOrderDetailScreen = ({ navigation, route }) => {
  const { orderDetail } = route.params;
  const [isloading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const [items, setItems] = useState([
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ]);

  const handleUpdateStatus = useCallback(async (id) => {
    setIsLoading(true);
    const { data = null, message = null } = await AdminService.updateOrderStatus(id, value);
    if (data) {
      setIsLoading(false);
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (orderDetail?.status == "delivered") {
      setStatusDisable(true);
    } else {
      setStatusDisable(false);
    }
    setValue(orderDetail.status);
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
          <Text style={styles.screenNameText}>Order Details</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            View all detail about order
          </Text>
        </View>
      </View>
      <FlatList
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
        data={[
          { key: 'shipAndBillTo', title: 'Ship & Bill to', content: orderDetail },
          { key: 'orderInfo', title: 'Order Info', content: orderDetail },
          { key: 'packageDetails', title: 'Package Details', content: { value, orderDetail } },
        ]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <View style={styles.containerNameContainer}>
              <Text style={styles.containerNameText}>{item.title}</Text>
            </View>
            {item.key === 'shipAndBillTo' && (
              <View style={styles.ShipingInfoContainer}>
                <Text style={styles.secondarytextMedian}>{item.content.user.name}</Text>
                <Text style={styles.secondarytextMedian}>{item.content.user.email}</Text>
                <Text style={styles.secondarytextSm}>
                  {item.content.country + ', ' + item.content.city + ', ' + item.content.delivery_address}
                </Text>
                <Text style={styles.secondarytextSm}>{item.content.zipcode}</Text>
              </View>
            )}
            {item.key === 'orderInfo' && (
              <View style={styles.orderInfoContainer}>
                <Text style={styles.secondarytextMedian}>Order # {item.content?.orderId}</Text>
                <Text style={styles.secondarytextSm}>Ordered on {dateFormat(item.content?.updatedAt)}</Text>
                {item.content?.shippedOn && (
                  <Text style={styles.secondarytextSm}>Shipped on {item.content?.delivery_date}</Text>
                )}
                {item.content?.deliveredOn && (
                  <Text style={styles.secondarytextSm}>Delivered on {item.content?.received_date}</Text>
                )}
              </View>
            )}
            {item.key === 'packageDetails' && (
              <View style={styles.orderItemsContainer}>
                <View style={styles.orderItemContainer}>
                  <Text style={styles.orderItemText}>Package</Text>
                  <Text>{item.content.value}</Text>
                </View>
                <View style={styles.orderItemContainer}>
                  <Text style={styles.orderItemText}>
                    Order on : {dateFormat(item.content.orderDetail?.updatedAt)}
                  </Text>
                </View>
                <FlatList
                  style={styles.orderSummaryContainer}
                  nestedScrollEnabled={true}
                  data={orderDetail.details}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View key={index}>
                      <BasicProductList
                        title={item?.title}
                        price={item?.price}
                        quantity={item?.quantity}
                      />
                    </View>
                  )}
                />
                <View style={styles.orderItemContainer}>
                  <Text style={styles.orderItemText}>Total</Text>
                  <Text>{orderDetail.amount}$</Text>
                </View>
              </View>
            )}
          </View>
        )}
      />
      <View style={styles.bottomContainer}>
        <View>
          <DropDownPicker
            style={{ width: 200 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disabled={statusDisable}
            disabledStyle={{
              backgroundColor: colors.light,
              borderColor: colors.white,
            }}
            labelStyle={{ color: colors.muted }}
          />
        </View>
        <View>
          {statusDisable == false ? (
            <CustomButton
              text={"Update"}
              onPress={() => handleUpdateStatus(orderDetail.id)}
            />
          ) : (
            <CustomButton text={"Update"} disabled />
          )}
        </View>
      </View>
    </View>
  );
};

export default ViewOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 0,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 10,
    fontSize: 15,
  },
  bodyContainer: { flex: 1, width: "100%", padding: 5 },
  ShipingInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.muted,
    elevation: 5,
    marginBottom: 10,
  },
  containerNameContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerNameText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.muted,
  },
  secondarytextSm: {
    color: colors.muted,
    fontSize: 13,
  },
  orderItemsContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 3,
    marginBottom: 10,
  },
  orderItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 13,
    color: colors.muted,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    width: "100%",
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    width: "110%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingLeft: 10,
    paddingRight: 10,
  },
  orderInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 1,
    marginBottom: 10,
  },
  primarytextMedian: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  secondarytextMedian: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "bold",
  },
  emptyView: {
    height: 20,
  },
});