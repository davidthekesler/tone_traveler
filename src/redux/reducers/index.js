import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
// import preset from './presetReducer';
import description from './descriptionReducer';
import library from './libraryReducer';
import sounds from './soundsReducer';

const store = combineReducers({
  user,
  login,
  // preset,
  description,
  library,
  sounds
  
});

export default store;
