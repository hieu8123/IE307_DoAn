import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import { colors, getAddressFromLocation } from "../../until";
import CustomButton from "../../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreaters from "../../action/actions";
import { bindActionCreators } from "redux";
import CustomInput from "../../components/CustomInput";
import CustomProgressBar from "../../components/CustomProgressBar";
import { Icon } from "@rneui/themed";
import { UserService } from "../../services";
import * as Location from 'expo-location';

const CheckoutScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { actionEmptyCart } = bindActionCreators(actionCreaters, dispatch);

  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleCheckout = async () => {
    setIsLoading(true);
    var payload = [];
    var totalamount = 0;

    cartproduct.forEach((product) => {
      const obj = {
        product_id: product.id,
        price: product.price,
        quantity: product.quantity,
      };
      totalamount += parseInt(product.price) * parseInt(product.quantity);
      payload.push(obj);
    });

    const order = {
      details: payload,
      amount: totalamount,
      discount: 0,
      payment_type: "cod",
      country: country,
      status: "pending",
      city: city,
      zipcode: zipcode,
      delivery_address: streetAddress,
    };

    const { data = null, message = null } = await UserService.checkOut(order);
    if (data) {
      setIsLoading(false);
      actionEmptyCart();
      navigation.replace("orderconfirm");
    } else {
      setIsLoading(false);
      if (message == 'jwt expired') logout(navigation);
    }
  };

  useEffect(() => {
    if (streetAddress && city && country != "") {
      setAddress(`${streetAddress}, ${city},${country}`);
    } else {
      setAddress("");
    }
  }, [streetAddress, city, country])

  useEffect(() => {
    setTotalCost(
      cartproduct.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity;
      }, 0)
    );
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const locationName = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const addressData = getAddressFromLocation(locationName[0]);
      setCountry(addressData.country);
      setCity(addressData.city);
      setStreetAddress(addressData.streetAddress);
      setZipcode(addressData.zipcode);
    })();
  }, []);
  const data = [
    { type: 'summary' },
    { type: 'total' },
    { type: 'contact' },
    { type: 'address' },
    { type: 'payment' },
  ];
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'summary':
        return <Text style={styles.primaryText}>Order Summary</Text>;
      case 'total':
        return (
          <View style={styles.totalOrderInfoContainer}>
            <View style={styles.list}>
              <Text>Order</Text>
              <Text>{totalCost}$</Text>
            </View>
            <View style={styles.list}>
              <Text>Delivery</Text>
              <Text>{deliveryCost}$</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.primaryTextSm}>Total</Text>
              <Text style={styles.secondaryTextSm}>
                {totalCost + deliveryCost}$
              </Text>
            </View>
          </View>
        );
      case 'contact':
        return (
          <>
            <Text style={styles.primaryText}>Contact</Text>
            <View style={styles.listContainer}>
              <View style={styles.list}>
                <Text style={styles.secondaryTextSm}>Email</Text>
                <Text style={styles.secondaryTextSm}>
                  bukhtyar.haider1@gmail.com
                </Text>
              </View>
              <View style={styles.list}>
                <Text style={styles.secondaryTextSm}>Phone</Text>
                <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
              </View>
            </View>
          </>
        );
      case 'address':
        return (
          <>
            <Text style={styles.primaryText}>Address</Text>
            <View style={styles.listContainer}>
              <TouchableOpacity
                style={styles.list}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.secondaryTextSm}>Address</Text>
                <View>
                  {country || city || streetAddress != '' ? (
                    <Text
                      style={styles.secondaryTextSm}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {address.length < 25
                        ? `${address}`
                        : `${address.substring(0, 25)}...`}
                    </Text>
                  ) : (
                    <Text style={styles.primaryTextSm}>Add</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'payment':
        return (
          <>
            <Text style={styles.primaryText}>Payment</Text>
            <View style={styles.listContainer}>
              <View style={styles.list}>
                <Text style={styles.secondaryTextSm}>Method</Text>
                <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <CustomProgressBar visible={isloading} label={"Placing Order..."} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            type="ionicon"
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <View></View>
        <View></View>
      </View>
      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
        <Text style={styles.primaryText}>Order Summary</Text>
        <ScrollView
          style={styles.orderSummaryContainer}
          nestedScrollEnabled={true}
        >
          {cartproduct.map((product, index) => (
            <BasicProductList
              key={index}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </ScrollView>
        <Text style={styles.primaryText}>Total</Text>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text>Order</Text>
            <Text>{totalCost}$</Text>
          </View>
          <View style={styles.list}>
            <Text>Delivery</Text>
            <Text>{deliveryCost}$</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.primaryTextSm}>Total</Text>
            <Text style={styles.secondaryTextSm}>
              {totalCost + deliveryCost}$
            </Text>
          </View>
        </View>
        <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>
              bukhtyar.haider1@gmail.com
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
          </View>
        </View>
        <Text style={styles.primaryText}>Address</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.secondaryTextSm}>Address</Text>
            <View>
              {country || city || streetAddress != "" ? (
                <Text
                  style={styles.secondaryTextSm}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {address.length < 25
                    ? `${address}`
                    : `${address.substring(0, 25)}...`}
                </Text>
              ) : (
                <Text style={styles.primaryTextSm}>Add</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.primaryText}>Payment</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Method</Text>
            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
          </View>
        </View>

        <View style={styles.emptyView}></View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        {country && city && streetAddress != "" ? (
          <CustomButton
            text={"Submit Order"}
            onPress={() => {
              handleCheckout();
            }}
          />
        ) : (
          <CustomButton text={"Submit Order"} disabled />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modelBody}>
          <View style={styles.modelAddressContainer}>
            <CustomInput
              value={country}
              setValue={setCountry}
              placeholder={"Enter Country"}
            />
            <CustomInput
              value={city}
              setValue={setCity}
              placeholder={"Enter City"}
            />
            <CustomInput
              value={streetAddress}
              setValue={setStreetAddress}
              placeholder={"Enter Street Address"}
            />
            <CustomInput
              value={zipcode}
              setValue={setZipcode}
              placeholder={"Enter ZipCode"}
              keyboardType={"number-pad"}
            />
            {streetAddress || city || country != "" ? (
              <CustomButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setAddress(`${streetAddress}, ${city},${country}`);
                }}
                text={"save"}
              />
            ) : (
              <CustomButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                text={"close"}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;

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
  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: colors.white,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  modelBody: {
    flex: 1,
    display: "flex",
    flexL: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modelAddressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 400,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 3,
  },
});
