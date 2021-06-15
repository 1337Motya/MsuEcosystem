import facultyApi from "../../api/facultyApi";

export const addFaculty = (faculty) => (dispatch) => {
  facultyApi.addFaculty(faculty).then((data) => {
    dispatch(fetchFaculties());
  });
};

export const updateFaculty = (form) => (dispatch) => {
  facultyApi.updateFaculty(form).then((data) => {
    dispatch(fetchFaculties());
  });
};

export const fetchFaculties = () => (dispatch) => {
  dispatch(setStatus(false));
  facultyApi.fetchFaculties().then((data) => {
    dispatch(setFaculties(data));
  });
};

export const fetchFaculty = (id) => (dispatch) => {
  console.log(123);
  dispatch(setStatus(false));
  facultyApi.fetchFaculty(id).then((data) => {
    console.log(data);
    dispatch(setFaculty(data));
  });
};

export const deleteFaculty = (id) => (dispatch) => {
  facultyApi.deleteFaculty(id).then((data) => {
    dispatch(fetchFaculties());
  });
};

export const setFaculties = (items) => ({
  type: "SET_FACULTIES",
  payload: items,
});

export const setFaculty = (item) => ({
  type: "SET_FACULTY",
  payload: item,
});

export const setStatus = (status) => ({
  type: "SET_LOADED",
  payload: status,
});
