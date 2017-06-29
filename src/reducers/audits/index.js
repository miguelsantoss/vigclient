import { APP_INIT } from '../../actions/common';

export const initialState = {
  sidebarOpened: false,
};

export function audits(state = initialState, action) {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    default:
      return state;
  }
}
