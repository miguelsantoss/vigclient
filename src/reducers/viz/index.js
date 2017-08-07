import { APP_INIT, RESET_STATE } from '../../actions/common';
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
  lineCharts: {
    all: [],
    latest: [],
  },
};

export default function viz(state = initialState, action) {
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
          all: action.result.pieData.all,
          latest: action.result.pieData.latest,
          fetchLoading: false,
          fetchError: false,
        },
        lineCharts: {
          ...state.lineCharts,
          latest: action.result.lineGraphData.latest,
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
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

