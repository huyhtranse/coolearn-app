import * as Types from "../Constants/Constants";
export const courseCategories = data => {
  return {
    type: Types.COURSE_CATEGORIES,
    payload: data
  };
};
