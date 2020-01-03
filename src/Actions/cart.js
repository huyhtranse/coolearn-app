import * as Types from "../Constants/Constants";
export const cartList = data => {
  return {
    type: Types.CART_LIST,
    payload: data
  };
};
