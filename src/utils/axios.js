import axios from 'axios';
import { TOKEN } from '../actions/constants';

const customAxios = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: localStorage.getItem(TOKEN),
  },
});

export default customAxios;
