import { fetchAudits } from '../../api/audits';

export const FETCH_AUDITS_SUCCESS = 'FETCH_AUDITS_SUCCESS';
export const FETCH_AUDITS_LOADING = 'FETCH_AUDITS_LOADING';
export const FETCH_AUDITS_FAIL = 'FETCH_AUDITS_FAIL';

export const SORT_AUDITS = 'SORT_AUDITS';

export const FETCH_AUDITS = () =>
  (dispatch) => {
    dispatch({ type: FETCH_AUDITS_LOADING });
    fetchAudits()
      .then(response => dispatch({ type: FETCH_AUDITS_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_AUDITS_FAIL, result: err }));
  };

export const SORT_AUDITS_BY = (key, ascending) =>
  dispatch => dispatch({ type: SORT_AUDITS, result: { key, ascending } });
