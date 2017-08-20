import _ from 'lodash';

import { APP_INIT, RESET_STATE } from '../../actions/common';
import {
  FETCH_VULNERABILITY_BY_ID_SUCCESS,
  FETCH_VULNERABILITY_BY_ID_LOADING,
  FETCH_VULNERABILITY_BY_ID_FAIL,
} from '../../actions/vulnerability';

const initialState = {
  list: [],
};

export default function audits(state = initialState, action) {
  let vulnerability;
  let vulnerabilityList;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_VULNERABILITY_BY_ID_LOADING:
      vulnerabilityList = _.cloneDeep(state.list);
      index = _.findIndex(vulnerabilityList, 'id', action.result.id);

      if (index !== -1) {
        vulnerabilityList[index].fetchError = false;
        vulnerabilityList[index].fetchLoading = true;
      } else {
        vulnerabilityList.push({
          id: action.result.id,
          fetchError: false,
          fetchLoading: true,
        });
      }

      return {
        ...state,
        vulnerabilityList,
      };
    case FETCH_VULNERABILITY_BY_ID_SUCCESS:
      vulnerability = action.result;
      vulnerability.fetchError = false;
      vulnerability.fetchLoading = false;

      vulnerabilityList = _.cloneDeep(state.list);
      index = _.findIndex(vulnerabilityList, 'id', vulnerability.id);
      if (index !== -1) {
        vulnerabilityList[index] = vulnerability;
      } else {
        vulnerabilityList.push(vulnerability);
      }

      return {
        ...state,
        vulnerabilityList,
      };
    case FETCH_VULNERABILITY_BY_ID_FAIL:
      vulnerabilityList = _.cloneDeep(state.list);
      index = _.findIndex(vulnerabilityList, 'id', action.result.id);

      if (index !== -1) {
        vulnerabilityList[index].fetchError = action.result.err;
        vulnerabilityList[index].fetchLoading = false;
      } else {
        vulnerabilityList.push({
          id: action.result.id,
          fetchError: action.result.err,
          fetchLoading: false,
        });
      }

      return {
        ...state,
        vulnerabilityList,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
