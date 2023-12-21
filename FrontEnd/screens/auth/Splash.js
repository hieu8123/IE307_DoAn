import { StyleSheet, Image, View } from "react-native";
import React, { useEffect } from "react";
import { colors, getAuthUser, splashImages } from "../../until";
import { useState } from "react";
import * as Speech from 'expo-speech';

const Splash = ({ navigation }) => {
  const [splashIndex, setSplashIndex] = useState(0);
  useEffect(() => {
    const speechOptions = {
      language: 'en-US',
      rate: 1.0,
      pitch: 1.0
    };

    Speech.speak('Welcome To Ecommerce App', speechOptions);
    const loadSplashImages = async () => {
      for (let index = 0; index < splashImages.length; index++) {
        setSplashIndex(index);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    const retrieveData = async () => {
      await loadSplashImages();

      const user = await getAuthUser();

      if (user !== null) {
        setTimeout(() => {
          navigation.replace(user.role === 'ROLE_ADMIN' ? 'dashboard' : 'tab');
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('login');
        }, 2000);
      }
    };

    retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={splashImages[splashIndex].image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    color: colors.light,
    fontSize: 50,
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
});

export default Splash;