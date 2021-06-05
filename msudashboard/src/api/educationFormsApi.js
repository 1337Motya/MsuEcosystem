import axiosInstance from "./axiosInstance";

const educationFormsApi = {
  addEducationForm(name) {
    return axiosInstance
      .post(`EducationForms`, {
        name: name
      })
      .then(({ data }) => data);
  },
  updateEducationForm(form) {
    return axiosInstance
      .put(`EducationForms`, form)
      .then(({ data }) => data);
  },
  fetchEducationForms() {
    return axiosInstance
      .get(`EducationForms`)
      .then(({ data }) => data);
  },
  deleteEducationForm(id) {
    return axiosInstance
      .delete(`EducationForms/${id}`)
      .then(({ data }) => data);
  },
};

export default educationFormsApi;
