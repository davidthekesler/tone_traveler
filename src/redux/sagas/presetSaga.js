import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* postSaga(action) {
    // console.log('in postSaga')
    try {
        const addedPreset = yield call(axios.post, '/api/preset', action.payload);
        // console.log('added item', addedPreset);
        yield put({
            type: 'GET_PRESETS',
        })
        yield put({
            type: 'GET_LIBRARY',
        })
    } catch (error) {
        console.log('postSaga ERROR', error)
    }
}

function* getSaga(action) {
    // console.log('in getSaga')
    try {
        const presetResponse = yield call(axios.get, '/api/preset');
        console.log(presetResponse)
        yield put({
            type: 'ALL_PRESETS',
            payload: presetResponse.data
        })
    } catch (error) {}
}

function* presetRootSaga(){
    yield takeEvery('ADD_PRESET', postSaga);
    yield takeEvery('GET_PRESETS', getSaga);
}

export default presetRootSaga;

