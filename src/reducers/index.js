import {
  LOGOUT,
  GET_USER_DATA,
  REGISTER,
  LOGIN,
  LOGIN_FAILED,
  TOKEN,
} from '../actions/constants';

const status = localStorage.getItem(TOKEN) ? true : false;

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
  auth_status: status,
};

// Modify the reducer in order to receive the actions
const reducer = function (state = initialState, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      token: action.payload.token,
      auth_status: true,
    };
  } else if (action.type === LOGOUT) {
    localStorage.removeItem(TOKEN);
    return {
      ...state,
      token: null,
      currentUser: {},
      login_failed: false,
      auth_status: false,
    };
  } else if (action.type === LOGIN_FAILED) {
    return { ...state, login_failed: true };
  } else if (action.type === GET_USER_DATA) {
    return {
      ...state,
      currentUser: {
        name: action.payload.name,
        type: action.payload.type,
        profile_photo: action.payload.profile_photo,
        email: action.payload.email,
        focus: action.payload.focus || null,
      },
      auth_status: true,
    };
  } else if (action.type === REGISTER) {
    return {
      ...state,
      token: action.payload.token,
      auth_status: true,
    };
  }
  return state;
};

export default reducer;
