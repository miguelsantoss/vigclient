import { fetchAudits } from '../../api/audits';

export const FETCH_AUDITS_SUCCESS = 'FETCH_AUDITS_SUCCESS';
export const FETCH_AUDITS_LOADING = 'FETCH_AUDITS_LOADING';
export const FETCH_AUDITS_FAIL = 'FETCH_AUDITS_FAIL';

export const FETCH_AUDITS = () =>
  (dispatch) => {
    dispatch({ type: 'FETCH_AUDITS_LOADING' });
    fetchAudits()
      .then(response => dispatch({ type: 'FETCH_AUDITS_SUCCESS', result: response }))
      .catch(err => dispatch({ type: 'FETCH_AUDITS_FAIL', result: err }));
  };
