import axios from 'axios';

export const fetchPageByID = id => axios.get(`/api/page/${id}`);
