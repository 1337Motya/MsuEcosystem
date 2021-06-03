import axiosInstance from "./axiosInstance";

const newsApi = {
  addDraft(title, image, text, isReadyForReview) {
    return axiosInstance
      .post(`News/drafts/create`, {
        title: title,
        text: text,
        previewImageUrl: image,
        isReadyForReview: isReadyForReview,
      })
      .then(({ data }) => data);
  },
  updateDraft(draft) {
    return axiosInstance
      .put(`News/drafts/update`, draft)
      .then(({ data }) => data);
  },
  fetchDrafts() {
    return axiosInstance
      .get(`News/drafts/list`)
      .then(({ data }) => data);
  },
  fetchDraft(id) {
    return axiosInstance.get(`News/drafts/${id}`).then(({ data }) => data);
  },
  deleteDraft(id) {
    return axiosInstance
      .delete(`News/drafts/${id}`)
      .then(({ data }) => data);
  },
};

export default newsApi;
