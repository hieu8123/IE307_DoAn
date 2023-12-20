import {
    cartAdd,
    cartRemove,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    emptyCart,
  } from "../slices";

  export const actionAddCartItem = (product) => {
    return (dispatch) => {
      dispatch(cartAdd(product));
    };
  };

  export const actionRemoveCartItem = (id) => {
    return (dispatch) => {
      dispatch(cartRemove(id));
    };
  };

  export const actionIncreaseCartItemQuantity = (id) => {
    return (dispatch) => {
      dispatch(increaseCartItemQuantity({ id, type: "increase" }));
    };
  };

  export const actionDecreaseCartItemQuantity = (id) => {
    return (dispatch) => {
      dispatch(decreaseCartItemQuantity({ id, type: "decrease" }));
    };
  };

  export const actionEmptyCart = () => {
    return (dispatch) => {
      dispatch(emptyCart());
    };
  };
