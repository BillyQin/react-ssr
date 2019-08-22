import { call, put } from 'redux-saga/effects';
import fetchReq from '@/utils/http';
import types from '@/actions/actionTypes';

export function* fetchHotLists(action) {
  const { payload } = action
  try {
    const lists = yield call(fetchReq, '/api/products', 'GET', {name: payload.name})
    yield put({type: types.PUT_HOT_LISTS, payload: {lists}})
    console.log('lists',lists)
    return lists
  } catch (e) {
    yield put({type: types.FETCH_FAILED, message: e.message})
  }
}