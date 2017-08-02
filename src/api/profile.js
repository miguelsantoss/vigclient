import axios from 'axios';

export const fetchProfileInfo = () => axios.get('/api/profile');
