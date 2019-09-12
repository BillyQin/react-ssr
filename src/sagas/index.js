import { takeLatest } from 'redux-saga/effects';
import { fetchHotLists } from './hot';

function* mySaga() {
  return [
    yield takeLatest('FETCH_HOT_LISTS', fetchHotLists),
  ];
}

export default mySaga;
