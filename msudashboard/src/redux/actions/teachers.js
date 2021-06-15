import teacherApi from "../../api/teacherApi";

export const addTeacher = (teacher) => (dispatch) => {
    teacherApi.addTeacher(teacher).then((data) => {
    console.log(data);
    // dispatch(fetchEducationForms());
  });
};

export const updateEducationForm = (form) => (dispatch) => {
    teacherApi.updateEducationForm(form).then((data) => {
    console.log(data);
    // dispatch(fetchEducationForms());
  });
};

export const fetchTeachers = () => (dispatch) => {
  dispatch(setStatus(false));
  teacherApi.fetchTeachers().then((data) => {
    dispatch(setTeachers(data));
  });
};

export const deleteEducationForm = (id) => (dispatch) => {
    teacherApi.deleteEducationForm(id).then((data) => {
    console.log(data);
  });
};

export const setTeachers = (items) => ({
  type: "SET_TEACHERS",
  payload: items,
});

export const setTeacher = (item) => ({
  type: "SET_TEACHER",
  payload: item,
});

export const setStatus = (status) => ({
  type: "SET_LOADED",
  payload: status,
});
