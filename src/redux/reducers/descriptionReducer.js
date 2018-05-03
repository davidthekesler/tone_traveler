import { combineReducers } from 'redux';

const allGeneralDescriptionsReducer = (state = [], action) => {
    if (action.type === 'ALL_DESCRIPTIONS_GENERAL') {
      console.log('in all descriptions general reducer', action.payload);
      return action.payload;
    }
    return state;
  }

  const allSpecificDescriptionsReducer = (state = [], action) => {
    if (action.type === 'TO_DO') {
      console.log('in all descriptions specific reducer', action.payload);
      return action.payload;
    }
    return state;
  }
  

  export default combineReducers({
    allGeneralDescriptionsReducer,
    allSpecificDescriptionsReducer,
  });
  
