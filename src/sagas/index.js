import { call, put, takeLatest } from 'redux-saga/effects';
import fetchReq from '@/utils/http';
import types from '@/actions/actionTypes';

function* fetchHotLists(action) {
  const { payload } = action

  try {
    const api = () => fetchReq('/api/products', 'GET', {name: payload.name}).catch(e => {
      throw e
    })
    const lists = yield call(api)
    yield put({type: types.PUT_HOT_LISTS, payload: {lists}})
  } catch (e) {
    yield put({type: types.FETCH_FAILED, message: e.message})
  }
}

function* mySaga() {
  [
    yield takeLatest("FETCH_HOT_LISTS", fetchHotLists),
  ]
}

export default mySaga;