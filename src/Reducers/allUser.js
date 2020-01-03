import * as Types from "../Constants/Constants";

const initialState = [];

export const allUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.ALL_USER:
      return action.payload;

    default:
      return state;
  }
};
