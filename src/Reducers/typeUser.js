import * as Types from "../Constants/Constants";

const initialState = "";

export const typeUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.TYPE_USER:
      return action.payload;

    default:
      return state;
  }
};
