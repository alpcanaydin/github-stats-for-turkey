import { combineReducers } from 'redux';

import list from './list';
import detail from './detail';

export default combineReducers({
  list,
  detail,
});
