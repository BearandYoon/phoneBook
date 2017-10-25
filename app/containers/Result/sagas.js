
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { requestBackend } from 'utils/request';

import { loadResultSuccess, loadResultFail } from './actions';
import { LOAD_RESULT } from './constants';

export function* loadResult(params) {
  try {
    const items = yield call(requestBackend, `/`, {
      method: 'GET',
    });
    yield put(loadResultSuccess(items));
  } catch (err) {
    yield put(loadResultFail(err));
  }
}

export function* loadResultWatcher() {
  const watcher = yield takeLatest(LOAD_RESULT, loadResult);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  loadResultWatcher,
];
