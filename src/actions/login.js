import axios from '../utils/axios';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

function login({ email, password }) {
  return async function (dispatch) {
    await axios
      .post('/login', { email, password })
      .then((response) => {
        const token = response.data.token;
        const userData = response.data.userData;
        dispatch({ type: LOGIN, payload: { token, userData } });
        localStorage.setItem('token', response.data.token);
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}

export default login;
