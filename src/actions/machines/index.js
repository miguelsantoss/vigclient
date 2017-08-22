import { fetchMachineByID } from '../../api/machines';

export const FETCH_MACHINE_BY_ID_SUCCESS = 'FETCH_MACHINE_BY_ID_SUCCESS';
export const FETCH_MACHINE_BY_ID_LOADING = 'FETCH_MACHINE_BY_ID_LOADING';
export const FETCH_MACHINE_BY_ID_FAIL = 'FETCH_MACHINE_BY_ID_FAIL';

export const FETCH_MACHINE_BY_ID = id =>
  (dispatch) => {
    dispatch({ type: FETCH_MACHINE_BY_ID_LOADING, result: { id } });
    fetchMachineByID(id)
      .then(response => dispatch({ type: FETCH_MACHINE_BY_ID_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_MACHINE_BY_ID_FAIL, result: { id, err } }));
  };
