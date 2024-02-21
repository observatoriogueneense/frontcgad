import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://backunilabtem.herokuapp.com/',
    // baseURL: 'http://localhost:8000/'
    baseURL: 'https://backcgad.onrender.com/'
    
});

export default api;