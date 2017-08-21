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
  let list;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_VULNERABILITY_BY_ID_LOADING:
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
    case FETCH_VULNERABILITY_BY_ID_SUCCESS:
      vulnerability = action.result;
      vulnerability.fetchError = false;
      vulnerability.fetchLoading = false;

      list = _.cloneDeep(state.list);
      index = _.findIndex(list, { id: vulnerability.id });
      if (index !== -1) {
        list[index] = vulnerability;
      } else {
        list.push(vulnerability);
      }

      return {
        ...state,
        list,
      };
    case FETCH_VULNERABILITY_BY_ID_FAIL:
      list = _.cloneDeep(state.list);
      index = _.findIndex(list, { id: parseInt(action.result.id, 10) });

      if (index !== -1) {
        list[index].fetchError = action.result.err;
        list[index].fetchLoading = false;
      } else {
        list.push({
          id: parseInt(action.result.id, 10),
          fetchError: action.result.err,
          fetchLoading: false,
        });
      }

      return {
        ...state,
        list,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
