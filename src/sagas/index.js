import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchHotLists } from './hot';

function* mySaga() {
  // [
  //   yield takeLatest("FETCH_HOT_LISTS", fetchHotLists),
  // ]
  yield call(fetchHotLists)
}

export default mySaga;