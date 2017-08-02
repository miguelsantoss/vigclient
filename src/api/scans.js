import axios from 'axios';

export const fetchScanByID = id => axios.get(`/api/scan/${id}`);
