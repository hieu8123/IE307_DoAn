import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  Modal,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { colors, network } from "../../until";
import CustomButton from "../../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../action/actions";
import { UserService } from "../../services";
import { Icon } from "@rneui/themed";
import { Rating } from 'react-native-ratings';
import CustomInput from "../../components/CustomInput";

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [tabIndex, setTabIndex] = useState(0);
  const [onWishlist, setOnWishlist] = useState(false);
  const [avaiableQuantity, setAvaiableQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isDisable, setIsDisbale] = useState(false);
  const cartproduct = useSelector((state) => state.product);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [totalRating, setTotalRating] = useState(product.total_rating)
  const [totalCount, setTotalCount] = useState(product.total_count)
  const dispatch = useDispatch();

  const { actionAddCartItem } = bindActionCreators(actionCreaters, dispatch);

  const handleAddToCat = useCallback((item) => {
    actionAddCartItem(item);
  });

  const fetchWishlist = useCallback(async () => {
    setIsDisbale(true);
    const { data: wishList = null, message = null } = await UserService.getWishListByUser();
    if (wishList) {
      setIsDisbale(false);
      wishList.map((item) => {
        if (item.product_id === product.id) {
          setOnWishlist(true);
        }
      });
    }
    else {
      if (message == 'jwt expired') logout(navigation);
    }
  });

  const handleIncreaseButton = useCallback((quantity) => {
    if (avaiableQuantity > quantity) {
      setQuantity(quantity + 1);
    }
  });

  const handleDecreaseButton = useCallback((quantity) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  });

  const handleWishlistBtn = useCallback(async () => {
    setIsDisbale(true);
    const wishlistAction = onWishlist ? UserService.deleteWishList : UserService.addWishList;
    const actionType = onWishlist ? 'delete' : 'add';
    const { data = null, message = null } = await wishlistAction(product.id);
    if (data) {
      setOnWishlist(actionType === 'delete' ? false : true);
    } else {
      if (message === 'jwt expired') logout(navigation);
    }

    setIsDisbale(false);
  });

  const fetchDetail = useCallback(async () => {
    const { productDetail = null, message = null } = await UserService.getProductDetail(product.id);
    if (productDetail) {
      setIsDisbale(false);
      setDetail(productDetail);
    }
    else {
      if (message == 'jwt expired') logout(navigation);
    }
  });

  const fetchReviews = useCallback(async () => {
    setIsDisbale(true);
    const { reviews: reviewsData = null, message = null } = await UserService.getProductReview(product.id);

    if (reviewsData) {
      setIsDisbale(false);
      const totalRating = reviewsData.reduce((total, review) => total + review.rating, 0);
      setTotalRating(totalRating);
      setTotalCount(reviewsData.length);
      setReviews(reviewsData);
    } else {
      if (message === 'jwt expired') logout(navigation);
    }
  });

  const handleAddReview = useCallback(async () => {
    setIsDisbale(true);
    const { data = null, message = null } = await UserService.addProductReview(product.id, {
      rating: rating,
      comment: comment,
    });
    if (data) {
      setComment("");
      setRating(5);
      setIsDisbale(false);
    }
    else {
      if (message == 'jwt expired') logout(navigation);
    }
  })

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReviews();
    setRefreshing(false);
  });

  useEffect(() => {
    setQuantity(0);
    setAvaiableQuantity(product.quantity);
    fetchWishlist();
    fetchDetail();
    fetchReviews();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-circle-outline" type="ionicon" size={30} color={colors.muted} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setTabIndex(0)}>
          <Text style={{ ...styles.tabButtonText, color: tabIndex == 0 ? colors.primary : '#333333' }}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setTabIndex(1)}>
          <Text style={{ ...styles.tabButtonText, color: tabIndex == 1 ? colors.primary : '#333333' }}>Specification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setTabIndex(2)}>
          <Text style={{ ...styles.tabButtonText, color: tabIndex == 2 ? colors.primary : '#333333' }}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : (
            <></>
          )}
          <Icon name="shopping-bag" type="font-awesome-5" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      {tabIndex == 0 &&
        <View style={styles.bodyContainer}>
          <View style={styles.productImageContainer}>
            <Image source={{ uri: `${network.serverip}${product.image}` }} style={styles.productImage} />
          </View>
          <View style={styles.productInfoContainer}>
            <View style={styles.productInfoTopContainer}>
              <View style={styles.productNameContaier}>
                <Text style={styles.productNameText}>{product.title}</Text>
              </View>
              <View style={styles.infoButtonContainer}>
                <View style={styles.wishlistButtonContainer}>
                  <TouchableOpacity
                    disabled={isDisable}
                    style={styles.iconContainer}
                    onPress={() => handleWishlistBtn()}
                  >
                    {onWishlist == false ? (
                      <Icon name="heart" type="ionicon" size={25} color={colors.muted} />
                    ) : (
                      <Icon name="heart" type="ionicon" size={25} color={colors.danger} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.productDetailContainer}>
                <View style={styles.productSizeOptionContainer}>
                  {/* <Text style={styles.secondaryTextSm}>Size:</Text> */}
                </View>
                <View style={styles.productPriceContainer}>
                  <Text style={styles.secondaryTextSm}>Price:</Text>
                  <Text style={styles.primaryTextSm}>{product.price}$</Text>
                </View>
              </View>
              <ScrollView>
                <View style={styles.productDescriptionContainer}>
                  <Text style={styles.secondaryTextSm}>Description:</Text>
                  <Text>{product.description}</Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.productInfoBottomContainer}>
              <View style={styles.counterContainer}>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButtonContainer}
                    onPress={() => {
                      handleDecreaseButton(quantity);
                    }}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterCountText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.counterButtonContainer}
                    onPress={() => {
                      handleIncreaseButton(quantity);
                    }}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.productButtonContainer}>
                {avaiableQuantity > 0 ? (
                  <CustomButton
                    text={"Add to Cart"}
                    onPress={() => {
                      handleAddToCat(product);
                    }}
                  />
                ) : (
                  <CustomButton text={"Out of Stock"} disabled={true} />
                )}
              </View>
            </View>
          </View>
        </View>
      }
      {tabIndex === 1 && (
        <View style={styles.specificationContainer}>
          {detail ? (
            <>
              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>Display:</Text>
                <Text style={styles.specificationDetail}>{detail.display}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>OS:</Text>
                <Text style={styles.specificationDetail}>{detail.os}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>Camera:</Text>
                <Text style={styles.specificationDetail}>{detail.camera}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>Front Camera:</Text>
                <Text style={styles.specificationDetail}>{detail.front_camera}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>CPU:</Text>
                <Text style={styles.specificationDetail}>{detail.cpu}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>RAM:</Text>
                <Text style={styles.specificationDetail}>{detail.ram}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>Storage:</Text>
                <Text style={styles.specificationDetail}>{detail.storage}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>SIM:</Text>
                <Text style={styles.specificationDetail}>{detail.sim}</Text>
              </View>

              <View style={styles.specificationRow}>
                <Text style={styles.specificationTitle}>Battery:</Text>
                <Text style={styles.specificationDetail}>{detail.battery}</Text>
              </View>
            </>
          ) : (
            <View style={styles.specificationRow}>
              <Text style={styles.specificationTitle}>No technical specifications available</Text>
            </View>
          )}
        </View>
      )}

      {tabIndex == 2 &&
        <View>
          <View style={styles.reviewInfoContainer}>
            {reviews.length == 1 ? (
              <Text style={styles.reviewInfoText}>No Reviews</Text>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.reviewInfoText}>
                  Review: {totalCount ? (totalRating / totalCount).toFixed(1) : 5}
                </Text>
                <Icon name="star" type="font-awesome" size={30} color="#ff8220" />
                <Text style={styles.reviewInfoText}>({totalCount})</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.addReviewButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addReviewButtonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
            }
            style={styles.listReviewContainer}
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.reviewContainer} pointerEvents="none">
                <Text style={styles.reviewName}>{item.username}</Text>
                <Rating
                  startingValue={item.rating}
                  tintColor={colors.light}
                  imageSize={20}
                />
                <Text style={styles.reviewComment}>{item.comment}</Text>
              </View>
            )}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modelBody}>
              <View style={styles.modelContainer}>
                <Rating
                  fractions={1}
                  jumpValue={0.5}
                  startingValue={rating}
                  onFinishRating={(rating) => setRating(rating)}
                  size={20}
                />
                <CustomInput
                  value={comment}
                  setValue={setComment}
                  placeholder={"Enter Comment"}
                  multiline={true}
                />
                {comment != "" ? (
                  <CustomButton
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleAddReview();
                    }}
                    text={"Add"}
                  />
                ) : (
                  <CustomButton
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    text={"close"}
                  />
                )}
              </View>
            </View>
          </Modal>
        </View>
      }

    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
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
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    marginTop: 25,
  },
  productImageContainer: {
    width: "100%",
    flex: 2,
    backgroundColor: colors.light,
    flexDirecion: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
  },
  productInfoContainer: {
    width: "100%",
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 25,
  },
  productImage: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
  productInfoTopContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  productInfoBottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.light,
    width: "100%",
    height: 140,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  productButtonContainer: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: colors.white,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productNameContaier: {
    padding: 5,
    paddingLeft: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  productNameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wishlistButtonContainer: {
    height: 50,
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetailContainer: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },
  secondaryTextSm: { fontSize: 15, fontWeight: "bold" },
  primaryTextSm: { color: colors.primary, fontSize: 15, fontWeight: "bold" },
  productDescriptionContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  counterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 50,
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  counterButtonContainer: {
    display: "flex",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.muted,
    borderRadius: 15,
    elevation: 2,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  counterCountText: {
    fontSize: 20,
    fontWeight: "bold",
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
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specificationContainer: {
    padding: 16,
  },
  specificationRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  specificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '50%',
  },
  specificationDetail: {
    fontSize: 16,
    marginLeft: 8,
    width: '50%',
  },
  listReviewContainer: {
    marginTop: 20,
  },
  reviewContainer: {
    alignItems: 'left',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  reviewName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 16,
    marginTop: 8,
  },
  addReviewButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  addReviewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modelBody: {
    flex: 1,
    display: "flex",
    flexL: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modelContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 300,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 3,
  },
  reviewInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 10,
  },
  reviewInfoText: {
    fontWeight: 'bold',
    fontSize: 30,
  }
});
