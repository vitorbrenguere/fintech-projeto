import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // A porta do Spring Boot
});

export default api;