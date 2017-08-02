import { APP_INIT } from '../../actions/common';
import {
  FETCH_AUDITS_SUCCESS,
  FETCH_AUDITS_LOADING,
  FETCH_AUDITS_FAIL,
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
