import axios from '../utils/axios';
import { TOKEN, REGISTER } from '../actions/constants';
import history from '../utils/history';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function register(type, inputs) {
  return async function (dispatch) {
    try {
      const response = await axios.post('/register', { type, inputs });
      const token = response.data.token;
      const userData = response.data.userData;
      localStorage.setItem(TOKEN, token);
      dispatch({ type: REGISTER, payload: { token, userData } });
      MySwal.fire({
        icon: 'success',
        title: <p className="swal__tittle">Successful Registration</p>,
        text: 'go ahead and start learning',
        confirmButtonColor: '#0de26f',
      });
      history.push('/');
    } catch (err) {
      MySwal.fire({
        icon: 'error',
        title: <p className="swal__tittle">Oops...</p>,
        text: 'Registration failed',
        confirmButtonColor: '#ce4c4c',
      });
    }
  };
}
