import axiosInstance from "./axiosInstance";

const facultyApi = {
  addFaculty(faculty) {
    return axiosInstance.post(`Faculties`, faculty).then(({ data }) => data);
  },
  updateFaculty(faculty) {
    return axiosInstance.put(`Faculties`, faculty).then(({ data }) => data);
  },
  fetchFaculties() {
    return axiosInstance.get(`Faculties`).then(({ data }) => data);
  },
  fetchFaculty(id) {
    return axiosInstance.get(`Faculties/${id}`).then(({ data }) => data);
  },
  deleteFaculty(id) {
    return axiosInstance.delete(`Faculties/${id}`).then(({ data }) => data);
  },
};

export default facultyApi;
