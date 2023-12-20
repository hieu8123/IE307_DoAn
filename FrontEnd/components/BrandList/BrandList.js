import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../until";
import { Icon } from "@rneui/themed";

const BrandList = ({
  icon,
  title,
  description,
  onPressEdit,
  onPressDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: icon }}
            style={{ height: 30, width: "auto", resizeMode: "contain" }}
          />
        </View>
        <View style={styles.brandInfo}>
          <Text style={styles.brandTitle}>{title}</Text>
          <Text style={styles.brandDescription}>{`${description.substring(
            0,
            35
          )}..`}</Text>
        </View>
      </View>
      <View style={styles.brandActionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onPressEdit}
        >
          <Icon type="material" name={"edit"} size={15} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.danger }]}
          onPress={onPressDelete}
        >
          <Icon type="material" name={"delete"} size={15} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BrandList;

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

  brandActionContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: 5,
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
});
