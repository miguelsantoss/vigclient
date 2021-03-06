import _ from 'lodash';

import { APP_INIT, RESET_STATE } from '../../actions/common';
import {
  FETCH_SCAN_BY_ID_SUCCESS,
  FETCH_SCAN_BY_ID_LOADING,
  FETCH_SCAN_BY_ID_FAIL,
} from '../../actions/scans';

const initialState = {
  list: [],
};

export default function audits(state = initialState, action) {
  let list;
  let scan;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_SCAN_BY_ID_LOADING:
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
          category: '',
          machines: [],
          vulnerabilities: [],
        });
      }

      return {
        ...state,
        list,
      };
    case FETCH_SCAN_BY_ID_SUCCESS:
      scan = action.result;
      scan.fetchError = false;
      scan.fetchLoading = false;

      list = _.cloneDeep(state.list);
      index = _.findIndex(list, { id: scan.id });
      if (index !== -1) {
        list[index] = scan;
      } else {
        list.push(scan);
      }

      return {
        ...state,
        list,
      };
    case FETCH_SCAN_BY_ID_FAIL:
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
          category: '',
          machines: [],
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
