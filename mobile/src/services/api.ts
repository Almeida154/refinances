import axios from 'axios';

const api = axios.create({
    // Seu ip abaixo 👇
    baseURL: 'http://192.168.1.109:3333'
});

export default api;