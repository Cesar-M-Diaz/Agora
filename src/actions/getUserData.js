import axios from '../utils/axios';
import { GET_USER_DATA, AUTH_FAILED } from './constants';

function getUserData(token) {
  return async function (dispatch) {
    try {
      const response = await axios.get('/login', { params: { token } });
      const { name, profile_photo, email, focus } = response.data.userData;
      const { type } = response.data;
      dispatch({
        type: GET_USER_DATA,
        payload: { name, type, profile_photo, email, focus },
      });
    } catch (err) {
      dispatch({
        type: AUTH_FAILED,
      });
    }
  };
}

export default getUserData;
