import axios from "axios";
const apiAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : "/",
  withCredentials: true,
});

export { apiAxios };
