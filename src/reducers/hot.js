import actionType from '@/actions/actionTypes';

const initialState = {
  lists: []
}

// 账户列表
export default function accounts(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actionType.PUT_HOT_LISTS:
      state = {...state, ...{lists: payload.lists}}
      return state
    default: return state
  }
}
