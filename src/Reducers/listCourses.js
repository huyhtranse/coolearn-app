import * as Types from '../Constants/Constants';

const initialState = [];

export const listCourses = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LIST_COURSES:
      return action.payload;

    default:
      return state;
  }
};
