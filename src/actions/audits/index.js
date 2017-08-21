import { fetchAudits, fetchAuditByID } from '../../api/audits';

export const FETCH_AUDITS_SUCCESS = 'FETCH_AUDITS_SUCCESS';
export const FETCH_AUDITS_LOADING = 'FETCH_AUDITS_LOADING';
export const FETCH_AUDITS_FAIL = 'FETCH_AUDITS_FAIL';

export const FETCH_AUDIT_BY_ID_SUCCESS = 'FETCH_AUDIT_BY_ID_SUCCESS';
export const FETCH_AUDIT_BY_ID_LOADING = 'FETCH_AUDIT_BY_ID_LOADING';
export const FETCH_AUDIT_BY_ID_FAIL = 'FETCH_AUDIT_BY_ID_FAIL';

export const FETCH_AUDITS = () =>
  (dispatch) => {
    dispatch({ type: FETCH_AUDITS_LOADING });
    fetchAudits()
      .then(response => dispatch({ type: FETCH_AUDITS_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_AUDITS_FAIL, result: err }));
  };

export const FETCH_AUDIT_BY_ID = id =>
  (dispatch) => {
    dispatch({ type: FETCH_AUDIT_BY_ID_LOADING, result: { id } });
    fetchAuditByID(id)
      .then(response => dispatch({ type: FETCH_AUDIT_BY_ID_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_AUDIT_BY_ID_FAIL, result: { id, err } }));
  };
