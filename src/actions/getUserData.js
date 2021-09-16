import axios from '../utils/axios';

export const GET_USER_DATA = 'GET_USER_DATA';

function getUserData(token) {
  return async function (dispatch) {
    axios.get('/login', { params: { token } }).then((response) => {
      const { name, profile_photo, email, focus } = response.data.userData;
      const { type } = response.data;
      dispatch({
        type: GET_USER_DATA,
        payload: { name, type, profile_photo, email, focus },
      });
    });
  };
}

export default getUserData;
