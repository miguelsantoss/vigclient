import { APP_INIT } from '../../actions/common';
import {
  FETCH_PROFILE_INFO_SUCCESS,
  FETCH_PROFILE_INFO_LOADING,
  FETCH_PROFILE_INFO_FAIL,
} from '../../actions/profile';

const initialState = {
  info: {},
  fetchLoading: false,
  fetchError: false,
};

export default function audits(state = initialState, action) {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_PROFILE_INFO_LOADING:
      return {
        ...state,
        fetchLoading: true,
      };
    case FETCH_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        info: action.result,
        fetchLoading: false,
        fetchError: false,
      };
    case FETCH_PROFILE_INFO_FAIL:
      return {
        ...state,
        fetchLoading: false,
        fetchError: true,
      };
    default:
      return state;
  }
}

