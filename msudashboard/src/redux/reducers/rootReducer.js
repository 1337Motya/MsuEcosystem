import { combineReducers } from "redux";

import auth from "./authReducer";
import news from "./newsReducer";
import educationForms from "./educationFormsReducer";
import library from "./libraryReducer";
import departments from "./departmentReducer";
import faculties from "./facultyReducer";
import teachers from "./teacherReducer";

const rootReducer = combineReducers({
  auth,
  news,
  educationForms,
  library,
  departments,
  faculties,
  teachers,
});

export default rootReducer;
