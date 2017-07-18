import { ADD_MESSAGE, DELETE_MESSAGE } from './types';

export function addMessages(message){
  return {
    type: ADD_MESSAGE,
    message
  }
}

export function deleteMessage(id) {
  return {
    type: DELETE_MESSAGE,
    id
  }
}