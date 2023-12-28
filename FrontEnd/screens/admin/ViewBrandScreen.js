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
import CustomInput from "../../components/CustomInput";
import CustomProgressBar from "../../components/CustomProgressBar";
import BrandList from "../../components/BrandList";
import { AdminService } from "../../services";
import { Icon } from "@rneui/themed";

const ViewBrandScreen = ({ navigation, route }) => {

  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [brands, setBrands] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBrands();
    setRefreshing(false);
  });

  const handleEdit = useCallback((item) => {
    navigation.navigate("editbrands", { brand: item, });
  });

  const handleDelete = useCallback(async (id) => {
    setIsLoading(true);
    const { data = null, message = null } = await AdminService.deleteBrand(id);
    if (data) {
      fetchBrands();
    } else {
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
      setIsLoading(false);
    }
  });

  const showConfirmDialog = useCallback((id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete the brand?",
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

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    const { brands: brandDatas = null, message = null } = await AdminService.getAllBrands();
    if (brandDatas) {
      setBrands(brandDatas);
      filter(brandDatas);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      if (message == 'jwt expired' || message == 'Not authorized. Admin role required.') logout(navigation);
    }
  });

  const filter = useCallback((data) => {
    const keyword = filterItem;
    if (keyword.trim() !== "") {
      const filteredResults = data.filter((brand) => {
        return brand.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(filteredResults);
    } else {
      setFoundItems(data);
    }
  });

  useEffect(() => {
    filter(brands);
  }, [filterItem]);

  useEffect(() => {
    fetchBrands();
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
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addbrands");
          }}
        >
          <Icon name="plus-square" type="font-awesome-5" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Brands</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all Brands</Text>
        </View>
      </View>
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={foundItems}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        ListEmptyComponent={() => (
          <Text>{`No brand found with the title of ${filterItem}!`}</Text>
        )}
        renderItem={({ item, index }) => (
          <BrandList
            icon={`${network.serverip}${item.image}`}
            title={item.name}
            description={item.description}
            onPressEdit={() => {
              handleEdit(item);
            }}
            onPressDelete={() => {
              showConfirmDialog(item?.id);
            }}
          />
        )}
      />
    </View>
  );
};

export default ViewBrandScreen;

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
    marginBottom: 10,
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
