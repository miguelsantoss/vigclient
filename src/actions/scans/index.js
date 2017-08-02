import { fetchScanByID } from '../../api/scans';

export const FETCH_SCAN_BY_ID_SUCCESS = 'FETCH_SCAN_BY_ID_SUCCESS';
export const FETCH_SCAN_BY_ID_LOADING = 'FETCH_SCAN_BY_ID_LOADING';
export const FETCH_SCAN_BY_ID_FAIL = 'FETCH_SCAN_BY_ID_FAIL';

export const FETCH_SCAN_BY_ID = id =>
  (dispatch) => {
    dispatch({ type: FETCH_SCAN_BY_ID_LOADING });
    fetchScanByID(id)
      .then(response => dispatch({ type: FETCH_SCAN_BY_ID_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_SCAN_BY_ID_FAIL, result: err }));
  };

