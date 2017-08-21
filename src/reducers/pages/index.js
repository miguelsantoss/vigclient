import _ from 'lodash';

import { APP_INIT, RESET_STATE } from '../../actions/common';
import {
  FETCH_PAGE_BY_ID_SUCCESS,
  FETCH_PAGE_BY_ID_LOADING,
  FETCH_PAGE_BY_ID_FAIL,
} from '../../actions/pages';

const initialState = {
  list: [],
};

export default function audits(state = initialState, action) {
  let list;
  let page;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_PAGE_BY_ID_LOADING:
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
          url: '',
          webVulnerabilities: [],
        });
      }

      return {
        ...state,
        list,
      };
    case FETCH_PAGE_BY_ID_SUCCESS:
      page = action.result;
      page.fetchError = false;
      page.fetchLoading = false;

      list = _.cloneDeep(state.list);
      index = _.findIndex(list, { id: page.id });
      if (index !== -1) {
        list[index] = page;
      } else {
        list.push(page);
      }

      return {
        ...state,
        list,
      };
    case FETCH_PAGE_BY_ID_FAIL:
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
          url: '',
          webVulnerabilities: [],
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
