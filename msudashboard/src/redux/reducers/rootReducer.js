import { combineReducers } from "redux";

import auth from './authReducer';
import news from './newsReducer';
import educationForms from './educationFormsReducer';

const rootReducer = combineReducers({
  auth,
  news,
  educationForms
});

export default rootReducer;