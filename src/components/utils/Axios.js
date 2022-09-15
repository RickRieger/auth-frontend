import axios from 'axios';
const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api'
      : 'https://movie-fun-backend.herokuapp.com/api',
  timeout: 50000,
});
export default Axios;
