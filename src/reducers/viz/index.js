import { APP_INIT } from '../../actions/common';
import {
  FETCH_VIZ_DATA_SUCCESS,
  FETCH_VIZ_DATA_LOADING,
  FETCH_VIZ_DATA_FAIL,
} from '../../actions/viz';

const initialState = {
  pieCharts: {
    all: [],
    latest: [],
    fetchError: false,
    fetchLoading: false,
  },
};

export default function audits(state = initialState, action) {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_VIZ_DATA_LOADING:
      return {
        ...state,
        pieCharts: {
          ...state.pieCharts,
          fetchLoading: true,
        },
      };
    case FETCH_VIZ_DATA_SUCCESS:
      return {
        ...state,
        pieCharts: {
          ...state.pieCharts,
          all: action.result.all,
          latest: action.result.latest,
          fetchLoading: false,
          fetchError: false,
        },
      };
    case FETCH_VIZ_DATA_FAIL:
      return {
        ...state,
        pieCharts: {
          ...state.pieCharts,
          fetchLoading: false,
          fetchError: true,
        },
      };
    default:
      return state;
  }
}

