import { fetchVizData } from '../../api/viz';

export const FETCH_VIZ_DATA_SUCCESS = 'FETCH_VIZ_DATA_SUCCESS';
export const FETCH_VIZ_DATA_LOADING = 'FETCH_VIZ_DATA_LOADING';
export const FETCH_VIZ_DATA_FAIL = 'FETCH_VIZ_DATA_FAIL';

export const FETCH_VIZ_DATA = () =>
  (dispatch) => {
    dispatch({ type: FETCH_VIZ_DATA_LOADING });
    fetchVizData()
      .then(response => dispatch({ type: FETCH_VIZ_DATA_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_VIZ_DATA_FAIL, result: err }));
  };

