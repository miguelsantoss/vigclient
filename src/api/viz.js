import axios from 'axios';

export const fetchVizData = () => axios.get('/api/viz');
