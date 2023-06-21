import axios from "axios";

// const baseURL = "http://3.34.134.62:3000";
// const baseURL = "http://localhost:4000";
const baseURL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL,
});

// client.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization =  token ? `Bearer ${token}` : '';

//   return config;
// });

export default client;
