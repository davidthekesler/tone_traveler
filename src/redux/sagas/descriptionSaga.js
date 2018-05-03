import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* getDescriptionGeneralSaga(action) {
    console.log('in getSaga')
    try {
        const descriptionGeneralResponse = yield call(axios.get, '/api/description/general');
        console.log(descriptionGeneralResponse)
        yield put({
            type: 'ALL_DESCRIPTIONS_GENERAL',
            payload: descriptionGeneralResponse.data
        })
    } catch (error) {}
}

function* descriptionRootSaga(){
    yield takeEvery('GET_DESCRIPTIONS_GENERAL', getDescriptionGeneralSaga);
}

export default descriptionRootSaga;

