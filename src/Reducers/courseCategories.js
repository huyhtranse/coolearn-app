import * as Types from "../Constants/Constants";

const initialState = "all";

export const courseCategories = (state = initialState, action) => {
  switch (action.type) {
    case Types.COURSE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
