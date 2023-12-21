import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../until";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";

const CartProductList = ({
  image,
  title,
  price,
  quantity = 1,
  handleDelete,
  onPressDecrement,
  onPressIncrement,
}) => {
  const rightSwipe = () => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="delete" type="material-community" size={50} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.containerOuter}>
        <Swipeable renderRightActions={rightSwipe}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.productImage} />
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productTitle}>{title}</Text>
              <Text style={styles.productQuantitySm}>x{quantity}</Text>
              <View style={styles.productListBottomContainer}>
                <Text style={styles.productPrice}>{price * quantity} $</Text>

                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButtonContainer}
                    onPress={onPressDecrement}
                  >
                    <Icon name="minus" type="font-awesome-5" size={20} />
                  </TouchableOpacity>
                  <Text style={styles.counterCountText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.counterButtonContainer}
                    onPress={onPressIncrement}
                  >
                    <Icon name="plus" type="font-awesome-5" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    </GestureHandlerRootView>
  );
};

export default CartProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 120,
    borderRadius: 15,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  containerOuter: {
    backgroundColor: colors.primary_light,
    height: 120,
    borderRadius: 15,
    width: "100%",
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  productInfoContainer: {
    padding: 10,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
  },
  productQuantitySm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.muted,
  },
  productPrice: {
    fontSize: 15,
    color: colors.secondary,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_light,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    width: 70,
  },
  productListBottomContainer: {
    width: "auto",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counter: {
    backgroundColor: colors.white,
    width: 150,
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
    borderBottomRightRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  counterButtonContainer: {
    display: "flex",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  counterCountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
