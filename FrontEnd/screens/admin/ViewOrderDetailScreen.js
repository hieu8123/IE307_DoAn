import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
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
  const [isloading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const [items, setItems] = useState([
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ]);

  const handleUpdateStatus = useCallback(async(id) => {
    setIsloading(true);
    const { data = null, message = null } = await AdminService.updateOrderStatus(id, value);
    if (data) {
      setIsloading(false);
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsloading(false);
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
      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Ship & Bill to</Text>
          </View>
        </View>
        <View style={styles.ShipingInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            {orderDetail?.user?.name}
          </Text>
          <Text style={styles.secondarytextMedian}>
            {orderDetail?.user?.email}
          </Text>
          <Text style={styles.secondarytextSm}>{orderDetail.country + ", " + orderDetail.city + ", " + orderDetail.shippingAddress}</Text>
          <Text style={styles.secondarytextSm}>{orderDetail?.zipcode}</Text>
        </View>
        <View>
          <Text style={styles.containerNameText}>Order Info</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            Order # {orderDetail?.orderId}
          </Text>
          <Text style={styles.secondarytextSm}>
            Ordered on {dateFormat(orderDetail.updatedAt)}
          </Text>
          {orderDetail?.shippedOn && (
            <Text style={styles.secondarytextSm}>
              Shipped on {orderDetail.delivery_date}
            </Text>
          )}
          {orderDetail?.deliveredOn && (
            <Text style={styles.secondarytextSm}>
              Delivered on {orderDetail.received_date}
            </Text>
          )}
        </View>
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Package Details</Text>
          </View>
        </View>
        <View style={styles.orderItemsContainer}>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Package</Text>
            <Text>{value}</Text>
          </View>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>
              Order on : {dateFormat(orderDetail?.updatedAt)}
            </Text>
          </View>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}
          >
            {orderDetail.details.map((product, index) => (
              <View key={index}>
                <BasicProductList
                  title={product?.productId?.title}
                  price={product?.price}
                  quantity={product?.quantity}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Total</Text>
            <Text>{items.amount}$</Text>
          </View>
        </View>
        <View style={styles.emptyView}></View>
      </ScrollView>
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