import { fork, join } from 'redux-saga/effects';

export default (sagas) => function* genTasks() {
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
  if (tasks.length) {
    yield tasks.map(task => join(task))
  }
};
