import { combineReducers } from "redux";

import auth from './authReducer';
import news from './newsReducer';

const rootReducer = combineReducers({
  auth,
  news
});

export default rootReducer;