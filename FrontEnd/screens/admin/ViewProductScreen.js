import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, network } from "../../until";
import ProductList from "../../components/ProductList/ProductList";
import CustomInput from "../../components/CustomInput/";
import CustomProgressBar from "../../components/CustomProgressBar";
import { AdminService } from "../../services";
import { Icon } from "@rneui/themed";

const ViewProductScreen = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProduct();
    setRefreshing(false);
  });

  const handleDelete = useCallback(async (id) => {
    setIsloading(true);
    const { data = null, message = null } = await AdminService.deleteProduct(id);
    if (data) {
      fetchProduct();
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsloading(false);
    }
  });

  const showConfirmDialog = useCallback((id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you certain you want to delete the product? Please note that it might be associated with other orders.",
      [
        {
          text: "Yes",
          onPress: () => {
            handleDelete(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  });

  const fetchProduct = useCallback(async () => {
    setIsloading(true);
    const { products: data = null, message = null } = await AdminService.getAllProducts();
    if (data) {
      setProducts(data);
      const keyword = filterItem;
      if (keyword.trim() !== "") {
        const results = data.filter((product) => {
          return product.title.toLowerCase().includes(keyword.toLowerCase());
        });
        setFoundItems(results);
      } else {
        setFoundItems(data);
      }
      setIsloading(false);
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsloading(false);
    }
  });

  const filter = useCallback(() => {
    const keyword = filterItem;
    if (keyword.trim() !== "") {
      const results = products.filter((product) => {
        return product.title.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(results);
    } else {
      setFoundItems(products);
    }
  });

  useEffect(() => {
    filter();
  }, [filterItem]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <View style={styles.container}>
      <CustomProgressBar visible={isloading} label={'Loading...'} />
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="arrow-back-circle-outline"
            type="ionicon"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addproduct");
          }}
        >
          <Icon name="plus-circle" type="font-awesome-5" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all products</Text>
        </View>
      </View>
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />

        <FlatList
          data={foundItems}
          style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ProductList
              key={index}
              image={`${network.serverip}${item.image}`}
              title={item.title}
              brand={item.brand}
              price={item.price}
              quantity={item.quantity}
              onPressView={() => {
                // Do something when pressed
              }}
              onPressEdit={() => {
                navigation.navigate("editproduct", {
                  product: item,
                });
              }}
              onPressDelete={() => {
                showConfirmDialog(item.id);
              }}
            />
          )}
          ListEmptyComponent={
            <Text>{`No product found with the name of ${filterItem}!`}</Text>
          }
        />
    </View>
  );
};

export default ViewProductScreen;

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
    justifyContent: "space-between",
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
});
