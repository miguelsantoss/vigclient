import _ from 'lodash';

import { APP_INIT, RESET_STATE } from '../../actions/common';
import {
  FETCH_MACHINE_BY_ID_SUCCESS,
  FETCH_MACHINE_BY_ID_LOADING,
  FETCH_MACHINE_BY_ID_FAIL,
} from '../../actions/machines';

const initialState = {
  list: [],
};

export default function audits(state = initialState, action) {
  let list;
  let machine;
  let index;
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_MACHINE_BY_ID_LOADING:
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
          ip_address: '',
          hostname: '',
          dns_name: '',
          operating_system: '',
          vulnerabilities: [],
        });
      }

      return {
        ...state,
        list,
      };
    case FETCH_MACHINE_BY_ID_SUCCESS:
      machine = action.result;
      machine.fetchError = false;
      machine.fetchLoading = false;

      list = _.cloneDeep(state.list);
      index = _.findIndex(list, { id: machine.id });
      if (index !== -1) {
        list[index] = machine;
      } else {
        list.push(machine);
      }

      return {
        ...state,
        list,
      };
    case FETCH_MACHINE_BY_ID_FAIL:
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
