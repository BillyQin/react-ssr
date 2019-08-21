import type from './actionTypes';

function putHotLists (payload) {
  return {
    type: type.PUT_HOT_LISTS,
    payload
  }
}

export {
  putHotLists,
}
