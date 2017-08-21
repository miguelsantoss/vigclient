import { fetchPageByID } from '../../api/pages';

export const FETCH_PAGE_BY_ID_SUCCESS = 'FETCH_PAGE_BY_ID_SUCCESS';
export const FETCH_PAGE_BY_ID_LOADING = 'FETCH_PAGE_BY_ID_LOADING';
export const FETCH_PAGE_BY_ID_FAIL = 'FETCH_PAGE_BY_ID_FAIL';

export const FETCH_PAGE_BY_ID = id =>
  (dispatch) => {
    dispatch({ type: FETCH_PAGE_BY_ID_LOADING, result: { id } });
    fetchPageByID(id)
      .then(response => dispatch({ type: FETCH_PAGE_BY_ID_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_PAGE_BY_ID_FAIL, result: { id, err } }));
  };
