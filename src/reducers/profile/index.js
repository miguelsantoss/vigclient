import { APP_INIT, RESET_STATE } from '../../actions/common';
import {
  FETCH_PROFILE_INFO_SUCCESS,
  FETCH_PROFILE_INFO_LOADING,
  FETCH_PROFILE_INFO_FAIL,
} from '../../actions/profile';

const initialState = {
  info: {
    acronym: '',
    address: '',
    country: '',
    district: '',
    fax: '',
    location: '',
    municipality: '',
    name: '',
    nif: '',
    postal_code: '',
    telephone: '',
    website: '',
    contacts: [],
  },
  fetchLoading: false,
  fetchError: false,
};

export default function profile(state = initialState, action) {
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
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

