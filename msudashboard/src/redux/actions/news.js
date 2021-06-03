import newsApi from "../../api/newsApi";

export const addDraft =
  (title, image, text, isReadyForReview) => (dispatch) => {
    newsApi.addDraft(title, image, text, isReadyForReview).then((data) => {
      console.log(data);
    });
  };

export const updateDraft = (draft) => (dispatch) => {
  newsApi.updateDraft(draft).then((data) => {
    console.log(data);
  });
};
export const fetchDrafts = () => (dispatch) => {
  dispatch(setStatus(false));
  newsApi.fetchDrafts().then((data) => {
    dispatch(setDrafts(data));
  });
};

export const fetchDraft = (id) => (dispatch) => {
  dispatch(setStatus(false));
  newsApi.fetchDraft(id).then((data) => {
    dispatch(setDraft(data));
  });
};

export const deleteDraft = (id) => (dispatch) => {
  newsApi.deleteDraft(id).then((data) => {
    console.log(data);
    dispatch(fetchDrafts());
  });
};

export const setDrafts = (items) => ({
  type: "SET_DRAFTS",
  payload: items,
});

export const setDraft = (item) => ({
  type: "SET_DRAFT",
  payload: item,
});

export const setStatus = (status) => ({
  type: "SET_LOADED",
  payload: status,
});
