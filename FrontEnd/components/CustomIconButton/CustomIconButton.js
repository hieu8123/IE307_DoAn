import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../until";

const CustomIconButton = ({ text, image, onPress, active }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? colors.primary_light : colors.white },
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 40,
    width: 110,
    elevation: 3,
    margin: 5,
  },
  buttonIcon: {
    height: 40,
    width: '100%',
    resizeMode: "center",
  },
});
