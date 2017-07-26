import axios from 'axios';

export const userSignupRequest = userData =>
  axios.post('/api/users', userData);

export const isUserExists = identifier =>
  axios.get(`/api/users/${identifier}`);
