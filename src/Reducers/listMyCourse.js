import * as Types from "../Constants/Constants";

const initialState = [];

export const listMyCourse = (state = initialState, action) => {
  switch (action.type) {
    case Types.LIST_MY_COURSE:
      return action.payload;

    default:
      return state;
  }
};
