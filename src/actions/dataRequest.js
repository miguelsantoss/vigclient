import axios from 'axios';

export function clientInfo(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}