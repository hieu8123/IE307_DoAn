import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../until";
import { Icon } from "@rneui/themed";

const WishList = ({
  image = "",
  title = " ",
  description = "",
  onPressRemove,
  onPressView,
}) => {
  const handleChangeState = () => {
    onPressRemove();
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressView}>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={{ height: 40, width: 40, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.brandInfo}>
          <Text style={styles.brandTitle}>{title}</Text>
          <Text style={styles.brandDescription}>{`${description?.substring(
            0,
            30
          )}..`}</Text>
        </View>
      </View>
      <View style={styles.brandActionContainer}>
        <View style={styles.infoButtonContainer}>
          <View style={styles.wishlistButtonContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleChangeState()}
            >
              <Icon name="heart" type="font-awesome-5" size={25} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: colors.white,
    height: 80,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.white,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
    elevation: 5,
    display: "flex",
    justifyContent: "center",

    backgroundColor: colors.light,
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  brandDescription: {
    fontSize: 12,
    color: colors.muted,
  },
  brandInfo: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    borderRadius: 5,
    elevation: 2,
  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wishlistButtonContainer: {
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
