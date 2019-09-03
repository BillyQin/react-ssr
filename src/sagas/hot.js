import { call, put } from 'redux-saga/effects';
import fetchReq from '@/utils/http';
import types from '@/actions/actionTypes';

function* fetchHotLists(params) {
  try {
    const lists = yield call(fetchReq, '/api/products', 'GET', {name: 'zhihu'})
    yield put({type: types.PUT_HOT_LISTS, payload: {lists}})
  } catch (e) {
    console.log('fetchHotLists error:', e)
    yield put({type: types.FETCH_FAILED, message: e.message})
  }
}

export {
  fetchHotLists
}