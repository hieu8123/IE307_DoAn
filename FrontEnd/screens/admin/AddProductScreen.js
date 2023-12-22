import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { colors } from "../../until";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import CustomProgressBar from "../../components/CustomProgressBar";
import { useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { AdminService, UploadService } from "../../services";
import { Icon } from "@rneui/themed";

const AddProductScreen = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ]);

  const fetchBrands = useCallback(async () => {
    setIsloading(true);
    const payload = [];
    const { brands: brandDatas = null, message = null } = await AdminService.getAllBrands();
    if (brandDatas) {
      setIsloading(false);
      brandDatas.forEach((brand) => {
        const obj = {
          label: brand.name,
          value: brand.id,
        };
        payload.push(obj);
      });
      setBrand(brandDatas[0].id);
      setItems(payload);
      setError("");
    } else {
      setIsloading(false);
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setError(message);
    }

  });

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  });

  const addProductHandle = useCallback(async () => {
    setIsloading(true);
    if (title == "") {
      setError("Please enter the product title");
      setIsloading(false);
    } else if (price == 0) {
      setError("Please enter the product price");
      setIsloading(false);
    } else if (quantity <= 0) {
      setError("Quantity must be greater then 1");
      setIsloading(false);
    } else if (image == null) {
      setError("Please upload the product image");
      setIsloading(false);
    } else {
      const { data: filename = null, message: messageImage = null } = await UploadService.uploadImageProduct(image);
      if (filename) {
        const { data = null, message = null } = await AdminService.addProduct({
          title: title,
          price: price,
          image: filename,
          description: description,
          brand_id: brand,
          quantity: quantity,
        });
        if (data) {
          setIsloading(false);
          navigation.navigate('viewproducts');
          setError("");
        } else {
          setIsloading(false);
          if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
          setError(message);
        }
      } else {
        setIsloading(false);
        if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
        setError(messageImage);
      }
    }
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <CustomProgressBar visible={isloading} label={"Adding ..."} />
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
          <Text style={styles.screenNameText}>Add Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add product details</Text>
        </View>
      </View>
      <CustomAlert message={error} type={"error"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            {image ? (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <Icon name="plus-circle" type="font-awesome-5" size={50} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>
          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"Title"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={price}
            setValue={setPrice}
            placeholder={"Price"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={quantity}
            setValue={setQuantity}
            placeholder={"Quantity"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={description}
            setValue={setDescription}
            placeholder={"Description"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <DropDownPicker
        placeholder={"Select Product Brand"}
        open={open}
        value={brand}
        items={items}
        setOpen={setOpen}
        setValue={setBrand}
        setItems={setItems}
        disabledStyle={{
          backgroundColor: colors.light,
          borderColor: colors.white,
        }}
        labelStyle={{ color: colors.muted }}
        style={{ borderColor: "#fff", elevation: 5 }}
      />
      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Product"} onPress={addProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
    justifyContent: "flex-start",
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
    marginTop: 10,
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
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
  },
});
