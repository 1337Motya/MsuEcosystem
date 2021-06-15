import departmentApi from "../../api/departmentApi";

export const addDepartment = (department) => (dispatch) => {
  departmentApi.addDepartment(department).then((data) => {
    dispatch(fetchDepartments());
  });
};

export const updateDepartment = (form) => (dispatch) => {
  departmentApi.updateDepartment(form).then((data) => {
    dispatch(fetchDepartments());
  });
};

export const fetchDepartments = (facultyId) => (dispatch) => {
  console.log("кафедры загружаются", facultyId)
  departmentApi.fetchDepartments(facultyId).then((data) => {
    console.log(data);
    dispatch(setDepartments(data));
  });
};

export const fetchDepartment = (departmentId) => (dispatch) => {
  departmentApi.fetchDepartment(departmentId).then((data) => {
    dispatch(setDepartment(data));
  });
};

export const deleteDepartment = (id) => (dispatch) => {
  departmentApi.deleteDepartment(id).then((data) => {
    dispatch(setDepartments());
  });
};

export const setDepartments = (items) => ({
  type: "SET_DEPARTMENTS",
  payload: items,
});

export const setDepartment = (item) => ({
  type: "SET_DEPARTMENT",
  payload: item,
});

export const setStatus = (status) => ({
  type: "SET_LOADED",
  payload: status,
});
