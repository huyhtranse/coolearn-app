import * as Types from "../Constants/Constants";

const initialState = {};

export const courseDetailAdmin = (state = initialState, action) => {
  switch (action.type) {
    case Types.COURSE_DETAIL_ADMIN:
      return action.payload;

    default:
      return state;
  }
};
