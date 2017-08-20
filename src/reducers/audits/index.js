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
  auditStatus: {
    fetchLoading: false,
    fetchError: false,
  },
};

export default function audits(state = initialState, action) {
  let auditList;
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
      auditList = _.cloneDeep(state.list);
      index = _.findIndex(auditList, 'id', action.result.id);

      if (index !== -1) {
        auditList[index].fetchError = false;
        auditList[index].fetchLoading = true;
      } else {
        auditList.push({
          id: action.result.id,
          fetchError: false,
          fetchLoading: true,
        });
      }

      return {
        ...state,
        auditList,
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
