import axiosInstance from "./axiosInstance";

const departmentApi = {
  addDepartment(department) {
    return axiosInstance
      .post(`Departments`, department)
      .then(({ data }) => data);
  },
  updateDepartment(department) {
    return axiosInstance
      .put(`Departments`, department)
      .then(({ data }) => data);
  },
  fetchDepartments(facultyId) {
    return axiosInstance
      .get(`Departments?facultyId=${facultyId}`)
      .then(({ data }) => data);
  },
  fetchDepartment(id) {
    return axiosInstance
      .get(`Departments/${id}`)
      .then(({ data }) => data);
  },
  deleteDepartment(id) {
    return axiosInstance.delete(`Departments/${id}`).then(({ data }) => data);
  },
};

export default departmentApi;
