import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/movies' });

export const addMovie = (movie) => API.post('/add', movie);
export const getMovies = () => API.get('/');
export const searchMovies = (query) => API.get(`/search?query=${query}`);
