import * as Types from "../Constants/Constants";

const initialState = [];

export const listSub = (state = initialState, action) => {
  switch (action.type) {
    case Types.LIST_SUB:
      return action.payload;

    default:
      return state;
  }
};
