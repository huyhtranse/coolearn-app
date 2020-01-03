import * as Types from '../Constants/Constants';

const initialState = {};

export const courseDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_COURSES_DETAIL:
      return action.payload;

    default:
      return state;
  }
};
