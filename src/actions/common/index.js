// I'm not sure, but I guess that if you use redux-devtools
// extension your APP_INIT should be look like:
// export const APP_INIT = '@@INIT'
export const APP_INIT = '@@redux/INIT'; // eslint-disable-line import/prefer-default-export
export const RESET_STATE = 'RESET_STATE';

export const RESET_STATE_STORE = () =>
  dispatch => dispatch({ type: RESET_STATE });
