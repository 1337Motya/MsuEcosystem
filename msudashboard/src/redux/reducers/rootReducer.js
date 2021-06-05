import { combineReducers } from "redux";

import auth from "./authReducer";
import news from "./newsReducer";
import educationForms from "./educationFormsReducer";
import library from "./libraryReducer";

const rootReducer = combineReducers({
  auth,
  news,
  educationForms,
  library,
});

export default rootReducer;
