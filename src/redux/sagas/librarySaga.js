import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* getLibrarySaga(action) {
    try {
        const libraryResponse = yield call(axios.get, '/api/library');
        console.log(libraryResponse)
        yield put({
            type: 'ALL_LIBRARY',
            payload: libraryResponse.data
        })
    } catch (error) {}
}

function* libraryRootSaga(){
    yield takeEvery('GET_LIBRARY', getLibrarySaga);
}

export default libraryRootSaga;

