import * as Types from "../Constants/Constants";

const initialState = [];

export const allCourses = (state = initialState, action) => {
  switch (action.type) {
    case Types.ALL_COURSES:
      return action.payload;

    default:
      return state;
  }
};
