import axios from 'axios';

export const fetchAudits = () => {
  return axios.get('/api/audits');
};
