import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, network } from "../../until";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../action/actions";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomInput from "../../components/CustomInput";
import { Icon } from "@rneui/themed";

const BrandsScreen = ({ navigation, route }) => {
  const { brandSelected = {} } = route.params;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedTab, setSelectedTab] = useState({});
  const [refeshing, setRefreshing] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const windowWidth = Dimensions.get("window").width;
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { actionAddCartItem } = bindActionCreators(actionCreaters, dispatch);

  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product: product });
  };

  const handleAddToCat = (product) => {
    actionAddCartItem(product);
  };

  const handleOnRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    await fetchBrands();
    setRefreshing(false);
  });

  const fetchProducts = useCallback(async () => {
    const { products: productDatas = null, message = null } = await UserService.getAllProducts();
    if (productDatas) {
      setProducts(productDatas);
      setFoundItems(productDatas);
    } else {
      if (message == 'jwt expired') logout(navigation);
    }
  });

  const fetchBrands = useCallback(async () => {
    const { brands: brandDatas = null, message = null } = await UserService.getAllBrands();
    if (brandDatas) {
      setBrands(brandDatas);
      filter(brandDatas);
    } else {
      if (message == 'jwt expired') logout(navigation);
    }
  });

  const filter = useCallback((data) => {
    const keyword = filterItem;
    if (keyword.trim() !== "") {
      const filteredResults = data.filter((product) => {
        return product.title.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(filteredResults);
    } else {
      setFoundItems(data);
    }
  });

  useEffect(() => {
    filter(products);
  }, [filterItem]);

  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, []);

  useEffect(() => {
    setSelectedTab(brandSelected);
  }, [brandSelected])

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.jumpTo("home");
          }}
        >
          <Icon name="arrow-back-circle-outline" size={30} color={colors.muted} type="ionicon" />
        </TouchableOpacity>

        <View></View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct?.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : (
            <></>
          )}
          <Icon name="shopping-cart" type="font-awesome-5" size={30} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ padding: 0, paddingLeft: 20, paddingRight: 20 }}>
          <CustomInput
            radius={5}
            placeholder={"Search..."}
            value={filterItem}
            setValue={setFilterItem}
          />
        </View>
        <FlatList
          data={brands}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              key={tab}
              text={tab.name}
              image={{ uri: `${network.serverip}${tab.image}` }}
              active={selectedTab.id === tab.id ? true : false}
              onPress={() => {
                setSelectedTab(tab);
              }}
            />
          )}
        />

        {foundItems.filter(
          (product) => selectedTab.id ? product.brand_id === selectedTab.id : true
        ).length === 0 ? (
          <View style={styles.noItemContainer}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.white,
                height: 150,
                width: 150,
                borderRadius: 10,
              }}
            >
              <Icon name="box-open" type="font-awesome-5" size={80} />

              <Text style={styles.emptyBoxText}>
                There no product in this brand
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={foundItems.filter(
              (product) => selectedTab.id ? product.brand_id === selectedTab.id : true
            )}
            refreshControl={
              <RefreshControl
                refreshing={refeshing}
                onRefresh={handleOnRefresh}
              />
            }
            keyExtractor={(index, item) => `${index}-${item}`}
            contentContainerStyle={{ margin: 10 }}
            numColumns={2}
            renderItem={({ item: product }) => (
              <View
                style={[
                  styles.productCartContainer,
                  { width: (windowWidth - windowWidth * 0.1) / 2 },
                ]}
              >
                <ProductCard
                  cardSize={"large"}
                  name={product.title}
                  image={`${network.serverip}${product.image}`}
                  price={product.price}
                  productCount={product.total_count}
                  productRate={product.total_rating}
                  quantity={product.quantity}
                  onPress={() => handleProductPress(product)}
                  onPressSecondary={() => handleAddToCat(product)}
                />
                <View style={styles.emptyView}></View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default BrandsScreen;

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
  bodyContainer: {
    flex: 1,
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,

    justifyContent: "flex-start",
    flex: 1,
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
  productCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  noItemContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyBoxText: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
  },
  emptyView: {
    height: 20,
  },
});
