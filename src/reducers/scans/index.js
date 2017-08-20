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
  let scanList;
  let scan;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_SCAN_BY_ID_LOADING:
      scanList = _.cloneDeep(state.list);
      index = _.findIndex(scanList, 'id', action.result.id);

      if (index !== -1) {
        scanList[index].fetchError = false;
        scanList[index].fetchLoading = true;
      } else {
        scanList.push({
          id: action.result.id,
          fetchError: false,
          fetchLoading: true,
        });
      }

      return {
        ...state,
        scanList,
      };
    case FETCH_SCAN_BY_ID_SUCCESS:
      scan = action.result;
      scanList.fetchError = false;
      scanList.fetchLoading = false;

      scanList = _.cloneDeep(state.list);
      index = _.findIndex(scanList, 'id', scan.id);
      if (index !== -1) {
        scanList[index] = scan;
      } else {
        scanList.push(scan);
      }

      return {
        ...state,
        scanList,
      };
    case FETCH_SCAN_BY_ID_FAIL:
      scanList = _.cloneDeep(state.list);
      index = _.findIndex(scanList, 'id', action.result.id);

      if (index !== -1) {
        scanList[index].fetchError = action.result.err;
        scanList[index].fetchLoading = false;
      } else {
        scanList.push({
          fetchError: action.result.err,
          fetchLoading: false,
        });
      }

      return {
        ...state,
        scanList,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
