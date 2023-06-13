import axios from "axios";

const baseURL = "http://3.38.168.129:3000";

const client = axios.create({
  baseURL,
});

export default client;
