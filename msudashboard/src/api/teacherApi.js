import axiosInstance from "./axiosInstance";

const teacherApi = {
  addTeacher(teacher) {
    return axiosInstance.post(`teachers`, teacher).then(({ data }) => data);
  },
  updateTeacher(teacher) {
    return axiosInstance.put(`teachers`, teacher).then(({ data }) => data);
  },
  fetchTeachers() {
    return axiosInstance.get(`teachers`).then(({ data }) => data);
  },
  fetchTeachersByFaculty(facultyId) {
    return axiosInstance
      .get(`teachers/faculty/${facultyId}`)
      .then(({ data }) => data);
  },
  fetchTeachersByDepartment(departmentId) {
    return axiosInstance
      .get(`teachers/department/${departmentId}`)
      .then(({ data }) => data);
  },
  fetchTeacher(id) {
    return axiosInstance.get(`teachers/${id}`).then(({ data }) => data);
  },
  deleteTeacher(id) {
    return axiosInstance.delete(`teachers/${id}`).then(({ data }) => data);
  },
};

export default teacherApi;
