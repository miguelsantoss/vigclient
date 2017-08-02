import axios from 'axios';

export const fetchAudits = () => axios.get('/api/audits');
