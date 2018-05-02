import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import preset from './presetReducer';

const store = combineReducers({
  user,
  login,
  preset
});

export default store;
