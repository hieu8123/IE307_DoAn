import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, network } from "../../until";
import CustomProgressBar from "../../components/CustomProgressBar";
import WishList from "../../components/WishList/WishList";
import { UserService } from "../../services";
import { Icon } from "@rneui/themed";

const MyWishlistScreen = ({ navigation, route }) => {
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const handleView = (product) => {
    navigation.navigate("productdetail", { product: product });
  };

  const handleOnRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchWishlist();
    setRefreshing(false);
  });

  const fetchWishlist = useCallback(async () => {
    setIsLoading(true);
    const { data: wishList = null, message = null } = await UserService.getWishListByUser();
    if (wishList) {
      setIsLoading(false);
      setWishlist(wishList);
    }
    else {
      setIsLoading(false);
      if (message == 'jwt expired') logout(navigation);
    }
  });

  const handleRemoveFromWishlist = useCallback(async (id) => {
    setIsLoading(true);
    const { data = null, message = null } = await UserService.deleteWishList(id);
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      if (message === 'jwt expired') logout(navigation);
    }
    fetchWishlist();
  });

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <CustomProgressBar visible={isloading} label={'Please wait...'} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
        <View></View>
        <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Icon name="heart-outline" type="ionicon" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Wishlist</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            View , add or remove products from wishlist for later purchase
          </Text>
        </View>
      </View>
      <FlatList
        style={{ flex: 1, width: "100%", padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        data={wishlist}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item, index }) => (
          <WishList
            image={`${network.serverip}${item.product.image}`}
            title={item.product.title}
            description={item.product.description}
            key={index}
            onPressView={() => handleView(item.product)}
            onPressRemove={() => handleRemoveFromWishlist(item.product.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.ListContiainerEmpty}>
            <Text style={styles.secondaryTextSmItalic}>
              "There are no product in wishlist yet."
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default MyWishlistScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
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
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
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
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  emptyView: {
    height: 20,
  },
  ListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
});
