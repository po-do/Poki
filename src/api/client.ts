import axios from 'axios';

const baseURL = 'http://실제url:8080'

const client = axios.create({
    baseURL,
});

export default client;