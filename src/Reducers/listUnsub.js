import * as Types from "../Constants/Constants";

const initialState = [];

export const listUnsub = (state = initialState, action) => {
  switch (action.type) {
    case Types.LIST_UNSUB:
      return action.payload;

    default:
      return state;
  }
};
