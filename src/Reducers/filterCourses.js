import * as Types from "../Constants/Constants";

const initialState = [];

export const filterCourses = (state = initialState, action) => {
  switch (action.type) {
    case Types.FILTER_COURSES:
      return action.payload;

    default:
      return state;
  }
};
