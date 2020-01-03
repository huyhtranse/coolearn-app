import * as Types from '../Constants/Constants';

const initialState = false;

export const isEnroll = (state = initialState, action) => {
  switch (action.type) {
    case Types.IS_ENROLL:
      return action.payload;

    default:
      return state;
  }
};
