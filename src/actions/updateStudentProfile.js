import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import history from '../utils/history';
import { UPDATE_STUDENT_PROFILE } from './constants';

const MySwal = withReactContent(Swal);

function updateStudentProfile({ ...changes }){
    return async function(dispatch){
        const response = await axios.patch('/updateProfile', { changes, token: localStorage.getItem("token") });
        console.log(response);
        // dispatch({ type: UPDATE_STUDENT_PROFILE, payload: response });
        MySwal.fire({
            icon: 'success',
            title: <p className="swal__tittle">Your data was updated successfully!</p>,
            confirmButtonColor: '#0de26f',
        })
        .then(() => {
            history.go(0);
        })
    }
}

export default updateStudentProfile;