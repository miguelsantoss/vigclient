import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initState = {
  isAuth: false,
  user: {}
};

export default (state = initState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuth: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
}