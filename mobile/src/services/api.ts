import axios from 'axios';

const api = axios.create({
    // Seu ip abaixo 👇
    baseURL: 'http://192.168.0.17:3333'
});

export default api;