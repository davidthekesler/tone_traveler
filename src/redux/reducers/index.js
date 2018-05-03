import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import preset from './presetReducer';
import description from './descriptionReducer';

const store = combineReducers({
  user,
  login,
  preset,
  description
});

export default store;
