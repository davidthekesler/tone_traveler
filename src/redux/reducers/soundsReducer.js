// import { combineReducers } from 'redux';

const allSoundsReducer = (state = [], action) => {
    if (action.type === 'ALL_SOUNDS') {
      // console.log('in all sounds reducer', action.payload);
      return action.payload;
    }
    return state;
  }

  export default allSoundsReducer;
  
