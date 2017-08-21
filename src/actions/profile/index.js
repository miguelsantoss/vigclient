import { fetchProfileInfo } from '../../api/profile';

export const FETCH_PROFILE_INFO_SUCCESS = 'FETCH_PROFILE_INFO_SUCCESS';
export const FETCH_PROFILE_INFO_LOADING = 'FETCH_PROFILE_INFO_LOADING';
export const FETCH_PROFILE_INFO_FAIL = 'FETCH_PROFILE_INFO_FAIL';

export const FETCH_PROFILE_INFO = () =>
  (dispatch) => {
    dispatch({ type: FETCH_PROFILE_INFO_LOADING });
    fetchProfileInfo()
      .then(response => dispatch({ type: FETCH_PROFILE_INFO_SUCCESS, result: response.data }))
      .catch(err => dispatch({ type: FETCH_PROFILE_INFO_FAIL, result: err }));
  };

