import axios from 'axios';

const api = axios.create({
  // Seu ip abaixo 👇
  // David: 192.168.0.17
<<<<<<< HEAD
  baseURL: 'http://192.168.15.114:3333',
=======
  baseURL: 'http://192.168.0.17:3333',
>>>>>>> b848d0420d0b478664a6c9e8b56ae6c7e055e1e3
});

export default api;
