import { LOGIN, LOGIN_FAILED } from '../actions/login';
import { LOGOUT } from '../actions/logout';
import { GET_USER_DATA } from '../actions/getUserData';
import { REGISTER, TOKEN } from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token') || null,
  currentUser: {
    name: null,
    type: null,
    profile_photo: null,
    email: null,
    focus: null,
  },
  login_failed: false,
};

// Modify the reducer in order to receive the actions
const reducer = function (state = initialState, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      token: action.payload.token,
      currentUser: action.payload.userData,
    };
  } else if (action.type === LOGOUT) {
    localStorage.removeItem('token');
    return { ...state, token: null, currentUser: {}, login_failed: false };
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
    };
  } else if (action.type === REGISTER) {
    return {
      ...state,
      token: action.payload.token,
      currentUser: action.payload.userData,
    };
  }
  return state;
};

export default reducer;
