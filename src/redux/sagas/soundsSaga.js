import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* getSoundsSaga(action) {
    try {
        const soundsResponse = yield call(axios.get, '/api/sounds');
        console.log(soundsResponse)
        yield put({
            type: 'ALL_SOUNDS',
            payload: soundsResponse.data
        })
    } catch (error) {}
}

function* soundsRootSaga(){
    yield takeEvery('GET_SOUNDS', getSoundsSaga);
}

export default soundsRootSaga;

