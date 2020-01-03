import * as Types from "../Constants/Constants";

const initialState = [];

export const cartList = (state = initialState, action) => {
  switch (action.type) {
    case Types.CART_LIST:
      return action.payload;

    default:
      return state;
  }
};
