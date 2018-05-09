import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import presetSaga from './presetSaga';
import descriptionSaga from './descriptionSaga';
import librarySaga from './librarySaga';
import soundsSaga from './soundsSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    presetSaga(),
    descriptionSaga(),
    librarySaga(),
    soundsSaga()

    // watchIncrementAsync()
  ]);
}
