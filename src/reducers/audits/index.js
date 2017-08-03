import _ from 'lodash';

import { APP_INIT } from '../../actions/common';
import {
  FETCH_AUDITS_SUCCESS,
  FETCH_AUDITS_LOADING,
  FETCH_AUDITS_FAIL,
  SORT_AUDITS,
} from '../../actions/audits';
import {
  FETCH_SCAN_BY_ID_SUCCESS,
  FETCH_SCAN_BY_ID_LOADING,
  FETCH_SCAN_BY_ID_FAIL,
} from '../../actions/scans';

const initialState = {
  auditList: [],
  auditStatus: {
    fetchLoading: false,
    fetchError: false,
  },
  auditSort: {
    key: 'created_at',
    ascending: false,
  },
  scanList: [],
  scanStatus: {
    fetchLoading: false,
    fetchError: false,
  },
};

export default function audits(state = initialState, action) {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_AUDITS_LOADING:
      return {
        ...state,
        auditStatus: {
          ...state.auditStatus,
          fetchLoading: true,
        },
      };
    case FETCH_AUDITS_SUCCESS:
      return {
        ...state,
        auditList: action.result,
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
    case SORT_AUDITS:
      const { key, ascending } = action.result;
      const auditList = _.cloneDeep(state.auditList);

      if (state.auditList.length !== 0) {
        switch (key) {
          case 'category':
            auditList.sort((a, b) => {
              if (a.category < b.category) return ascending ? -1 : 1;
              if (a.category > b.category) return ascending ? 1 : -1;
              return 0;
            });
            break;
          case 'created_at':
            auditList.sort((a, b) => {
              const aDate = new Date(a.created_at);
              const bDate = new Date(b.created_at);
              if (aDate < bDate) return ascending ? -1 : 1;
              if (aDate > bDate) return ascending ? 1 : -1;
              return 0;
            });
            break;
          case 'closed_at':
            auditList.sort((a, b) => {
              const aDate = a.closed_at ? new Date(a.closed_at) : Date.now();
              const bDate = b.closed_at ? new Date(b.closed_at) : Date.now();
              if (aDate < bDate) return ascending ? -1 : 1;
              if (aDate > bDate) return ascending ? 1 : -1;
              return 0;
            });
            break;
          default:
            break;
        }

        return {
          ...state,
          auditList,
          auditSort: {
            key,
            ascending,
          },
        };
      }
      return {
        ...state,
      };
    case FETCH_SCAN_BY_ID_LOADING:
      return {
        ...state,
        scanStatus: {
          ...state.scanStatus,
          fetchLoading: true,
        },
      };
    case FETCH_SCAN_BY_ID_SUCCESS:
      const scan = action.result;
      const scanList = [...state.scanList];

      for (let i = 0; i < scanList.length; i += 1) {
        if (scan.id === scanList[i].id) return { ...state };
      }

      scanList.push(scan);
      return {
        ...state,
        scanList,
        scanStatus: {
          fetchLoading: false,
          fetchError: false,
        },
      };
    case FETCH_SCAN_BY_ID_FAIL:
      return {
        ...state,
        scanStatus: {
          fetchLoading: false,
          fetchError: true,
        },
      };
    default:
      return state;
  }
}
