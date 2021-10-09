import axios from 'axios';

const api = axios.create({
  // Seu ip abaixo 👇
  baseURL: 'http://192.168.15.114:3333',
});

export default api;
