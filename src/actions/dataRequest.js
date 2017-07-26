import axios from 'axios';

export function clientInfo(identifier) {
  return dispatch =>
    axios.get(`/api/users/${identifier}`);
}
