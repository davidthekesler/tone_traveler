import { combineReducers } from 'redux';

const allLibraryReducer = (state = [], action) => {
    if (action.type === 'ALL_LIBRARY') {
      // console.log('in all descriptions general reducer', action.payload);
      return action.payload;
    }
    return state;
  }

  export default allLibraryReducer;
  
