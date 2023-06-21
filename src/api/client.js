import axios from "axios";

// const baseURL = "http://3.34.134.62:3000";
// const baseURL = "http://43.201.98.251:8000";
const baseURL = "http://localhost:4000";

const client = axios.create({
  baseURL,
});

// client.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization =  token ? `Bearer ${token}` : '';

//   return config;
// });

export default client;
