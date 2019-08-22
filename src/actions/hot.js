import type from './actionTypes';

function putHotLists (payload) {
  return {
    type: type.PUT_HOT_LISTS,
    payload
  }
}

function fetchHotLists (payload) {
  return (dispatch, getState) => {

  }

  // {
  //   type: type.FETCH_HOT_LISTS,
  //   payload
  // }
}

export {
  putHotLists,
  fetchHotLists
}
