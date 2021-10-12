import axios from 'axios';

const api = axios.create({
  // Seu ip abaixo 👇
  // David: 192.168.0.17
  baseURL: 'http://192.168.1.11:3333',
});

export default api;
