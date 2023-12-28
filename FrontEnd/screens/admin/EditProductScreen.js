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
import React, { useCallback, useEffect, useState } from "react";
import { colors, network, validateField, validateImage, validatePositiveNumber } from "../../until";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import CustomProgressBar from "../../components/CustomProgressBar";
import { AdminService, UploadService } from "../../services";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const EditProductScreen = ({ route }) => {

  const navigation = useNavigation();
  const { product } = route.params;
  const [isloading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState("");
  const [os, setOS] = useState("");
  const [sim, setSim] = useState("");
  const [frontCamera, setFrontCamera] = useState("");
  const [camera, setCamera] = useState("");
  const [cpu, setCPU] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [battery, setBattery] = useState("");

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

  const editProductHandle = useCallback(async () => {
    setIsLoading(true);
    if (
      validateField(setError, setIsLoading, title, "Please enter the product title") &&
      validateImage(setError, setIsLoading, price, "Please enter a valid product price") &&
      validatePositiveNumber(setError, setIsLoading, quantity, "Quantity must be greater than 0") &&
      validateField(setError, setIsLoading, display, "Please enter the product display") &&
      validateField(setError, setIsLoading, os, "Please enter the product operating system") &&
      validateField(setError, setIsLoading, sim, "Please enter the product SIM type") &&
      validateField(setError, setIsLoading, frontCamera, "Please enter the product front camera") &&
      validateField(setError, setIsLoading, camera, "Please enter the product rear camera") &&
      validateField(setError, setIsLoading, cpu, "Please enter the product CPU") &&
      validateField(setError, setIsLoading, ram, "Please enter the product RAM") &&
      validateField(setError, setIsLoading, storage, "Please enter the product storage") &&
      validateField(setError, setIsLoading, battery, "Please enter the product battery") &&
      validateImage(setError, setIsLoading, image, "Please upload the product image")) {
        const { data: filename = null, message: messageImage = null } = await UploadService.uploadImageProduct(image);
        if (filename) {
          const { data, message } = await AdminService.updateProduct(product.id, {
            title,
            price,
            image: filename,
            description,
            quantity,
            detail: {
              display,
              os,
              sim,
              front_camera: frontCamera,
              camera,
              cpu,
              ram,
              storage,
              battery,
            },
          });
          if (data) {
            setIsLoading(false);
            navigation.navigate('viewproducts');
            setError("");
          } else {
            setIsLoading(false);
            if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
            setError(message);
          }
        } else {
          setIsLoading(false);
          if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
          setError(messageImage);
        }
    }
  });

  useEffect(() => {
    setImage(`${network.serverip}${product.image}`);
    setTitle(product.title);
    setQuantity(product.quantity.toString());
    setPrice(product.price.toString());
    setDescription(product.description);
    setDisplay(product.detail.display);
    setOS(product.detail.os);
    setSim(product.detail.sim);
    setFrontCamera(product.detail.front_camera);
    setCamera(product.detail.camera);
    setCPU(product.detail.cpu);
    setRam(product.detail.ram);
    setStorage(product.detail.storage);
    setBattery(product.detail.battery);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <CustomProgressBar visible={isloading} label={'label'} />
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
          <Text style={styles.screenNameText}>Edit Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Edit product</Text>
        </View>
      </View>
      <CustomAlert message={error} type={"error"} />
      <ScrollView style={{ flex: 1, width: "100%" }}>
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
                <Icon name="pluscircle" type="antdesign" size={50} color={colors.muted} />
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
          <View>
            <Text style={styles.screenNameParagraph}>Edit product details</Text>
          </View>
          <CustomInput
            value={display}
            setValue={setDisplay}
            placeholder={"Display"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={os}
            setValue={setOS}
            placeholder={"Operating System"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={sim}
            setValue={setSim}
            placeholder={"Sim"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={frontCamera}
            setValue={setFrontCamera}
            placeholder={"Front Camera"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={camera}
            setValue={setCamera}
            placeholder={"Camera"}
            placeholderTextColor={colors.muted}
            radius={5}
          />

          <CustomInput
            value={cpu}
            setValue={setCPU}
            placeholder={"CPU"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={ram}
            setValue={setRam}
            placeholder={"RAM"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={storage}
            setValue={setStorage}
            placeholder={"Storage"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={battery}
            setValue={setBattery}
            placeholder={"Battery"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Edit Product"} onPress={editProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

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
