import { APP_INIT, RESET_STATE } from '../../actions/common';
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
import {
  FETCH_VULNERABILITY_BY_ID_SUCCESS,
  FETCH_VULNERABILITY_BY_ID_LOADING,
  FETCH_VULNERABILITY_BY_ID_FAIL,
} from '../../actions/vulnerability';

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
  vulnerabilityList: [],
  vulnStatus: {
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
          fetchError: false,
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
          fetchError: false,
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
    case FETCH_VULNERABILITY_BY_ID_LOADING:
      return {
        ...state,
        vulnStatus: {
          fetchError: false,
          fetchLoading: true,
        },
      };
    case FETCH_VULNERABILITY_BY_ID_SUCCESS:
      const vulnerability = action.result;
      const vulnerabilityList = [...state.vulnerabilityList];

      for (let i = 0; i < vulnerabilityList.length; i += 1) {
        if (vulnerability.id === vulnerabilityList[i].id) return { ...state };
      }

      vulnerabilityList.push(vulnerability);
      return {
        ...state,
        vulnerabilityList,
        vulnStatus: {
          fetchLoading: false,
          fetchError: false,
        },
      };
    case FETCH_VULNERABILITY_BY_ID_FAIL:
      return {
        ...state,
        vulnStatus: {
          fetchLoading: false,
          fetchError: true,
        },
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
