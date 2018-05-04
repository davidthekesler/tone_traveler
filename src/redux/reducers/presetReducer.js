import { combineReducers } from 'redux';

const allPresetsReducer = (state = [], action) => {
    if (action.type === 'ALL_PRESETS') {
      // console.log('in all Presets', action.payload);
      return action.payload;
    }
    return state;
  }
  
  const currentPresetReducer = (state = {}, action) => {
    if (action.type === 'CURRENT_PRESET') {
      return action.payload;
    }
    return state;
  }
  

export default combineReducers({
  allPresetsReducer,
  currentPresetReducer,
});