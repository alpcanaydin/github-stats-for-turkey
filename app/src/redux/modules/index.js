import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import initial from './initial';

export default combineReducers({
  router: routerReducer,
  initial,
});
