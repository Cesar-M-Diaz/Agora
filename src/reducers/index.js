import { REGISTER, TOKEN } from '../actions/constants';

const initialState = {
  token: localStorage.getItem(TOKEN) || null,
  currentUser: {
    name: null,
    type: null,
    profile_photo: null,
    email: null,
    focus: null,
  },
  login_failed: false,
};

const reducer = function (state = initialState, action) {
  if (action.type === REGISTER) {
    return {
      ...state,
      token: action.payload.token,
      currentUser: action.payload.userData,
    };
  }
  return state;
};

export default reducer;
