import { ADD_MESSAGE, DELETE_MESSAGE } from './types';

export const addMessages = message => ({
  type: ADD_MESSAGE,
  message,
});

export const deleteMessage = id => ({
  type: DELETE_MESSAGE,
  id,
});
