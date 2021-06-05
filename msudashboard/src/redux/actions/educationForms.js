import educationFormsApi from "../../api/educationFormsApi";

export const addEducationForm = (name) => (dispatch) => {
  educationFormsApi.addEducationForm(name).then((data) => {
    console.log(data);
    dispatch(fetchEducationForms());
  });
};

export const updateEducationForm = (form) => (dispatch) => {
  educationFormsApi.updateEducationForm(form).then((data) => {
    console.log(data);
    dispatch(fetchEducationForms());
  });
};

export const fetchEducationForms = () => (dispatch) => {
  dispatch(setStatus(false));
  educationFormsApi.fetchEducationForms().then((data) => {
    dispatch(setEducationForms(data));
  });
};

export const deleteEducationForm = (id) => (dispatch) => {
  educationFormsApi.deleteEducationForm(id).then((data) => {
    console.log(data);
    dispatch(fetchEducationForms());
  });
};

export const setEducationForms = (items) => ({
  type: "SET_EDUCATIONFORMS",
  payload: items,
});

export const setEducationForm = (item) => ({
  type: "SET_EDUCATIONFORM",
  payload: item,
});

export const setStatus = (status) => ({
  type: "SET_LOADED",
  payload: status,
});
