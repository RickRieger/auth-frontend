import axios from "axios";
const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_AXIOS === "development"
      ? "http://localhost:8080/api"
      : "/api",
  timeout: 50000,
});
export default Axios;