import _ from 'lodash';

import { APP_INIT, RESET_STATE } from '../../actions/common';
import {
  FETCH_AUDITS_SUCCESS,
  FETCH_AUDITS_LOADING,
  FETCH_AUDITS_FAIL,
  FETCH_AUDIT_BY_ID_SUCCESS,
  FETCH_AUDIT_BY_ID_LOADING,
  FETCH_AUDIT_BY_ID_FAIL,
} from '../../actions/audits';

const initialState = {
  list: [],
  fetchLoading: false,
  fetchError: false,
};

export default function audits(state = initialState, action) {
  let list;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_AUDITS_LOADING:
      return {
        ...state,
        auditStatus: {
          fetchError: false,
          fetchLoading: true,
        },
      };
    case FETCH_AUDITS_SUCCESS:
      return {
        ...state,
        list: action.result,
        auditStatus: {
          fetchLoading: false,
          fetchError: false,
        },
      };
    case FETCH_AUDITS_FAIL:
      return {
        ...state,
        auditStatus: {
          fetchLoading: false,
          fetchError: true,
        },
      };
    case FETCH_AUDIT_BY_ID_LOADING:
      list = _.cloneDeep(state.list);
      index = _.findIndex(list, { id: parseInt(action.result.id, 10) });

      if (index !== -1) {
        list[index].fetchError = false;
        list[index].fetchLoading = true;
      } else {
        list.push({
          id: parseInt(action.result.id, 10),
          fetchError: false,
          fetchLoading: true,
        });
      }

      return {
        ...state,
        list,
      };
    case FETCH_AUDIT_BY_ID_SUCCESS:
      return {
        ...state,
      };
    case FETCH_AUDIT_BY_ID_FAIL:
      return {
        ...state,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
