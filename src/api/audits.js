import axios from 'axios';

export const fetchAudits = () => axios.get('/api/audits');
export const fetchAuditByID = id => axios.get(`/api/audits/${id}`);
