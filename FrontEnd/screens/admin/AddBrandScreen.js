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
import { Icon } from "@rneui/themed";
import { AdminService, UploadService } from "../../services";

const AddBrandScreen = ({ navigation, route }) => {
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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

  const addBrandHandle = useCallback(async () => {
    setIsLoading(true);
    if (name == "") {
      setError("Please enter the brand name");
      setIsLoading(false);
    } else if (description == "") {
      setError("Please upload the brand description");
      setIsLoading(false);
    } else if (image == null) {
      setError("Please upload the Catergory image");
      setIsLoading(false);
    } else {
      const { data: filename = null, message: messageImage = null } = await UploadService.uploadImageBrand(image);
      if (filename) {
        const { data = null, message = null } = await AdminService.addBrand({
          name: name,
          image: filename,
          description: description,
        });
        if (data) {
          setIsLoading(false);
          navigation.navigate('viewbrands');
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
          <Text style={styles.screenNameText}>Add Brand</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add brand details</Text>
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
            value={name}
            setValue={setName}
            placeholder={"Name"}
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

      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Brand"} onPress={addBrandHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddBrandScreen;

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
