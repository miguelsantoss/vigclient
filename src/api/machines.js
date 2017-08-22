import axios from 'axios';

export const fetchMachineByID = id => axios.get(`/api/machine/${id}`);
