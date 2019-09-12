import type from './actionTypes';

function putHotLists(payload) {
  return {
    type: type.PUT_HOT_LISTS,
    payload
  };
}

export {
  // eslint-disable-next-line import/prefer-default-export
  putHotLists,
};
