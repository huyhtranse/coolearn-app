import * as Types from '../Constants/Constants';

const initialState = {};

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_USER:
      return action.payload;

    default:
      return state;
  }
};
