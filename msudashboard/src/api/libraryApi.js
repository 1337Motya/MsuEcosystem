import axiosInstance from "./axiosInstance";

const libraryApi = {
  addGenre(name) {
    return axiosInstance
      .post(`Library/genres`, {
        name: name,
      })
      .then(({ data }) => data);
  },
  updateGenre(genre) {
    return axiosInstance.put(`Library/genres`, genre).then(({ data }) => data);
  },
  fetchGenres() {
    return axiosInstance.get(`Library/genres`).then(({ data }) => data);
  },
  deleteGenre(id) {
    return axiosInstance
      .delete(`Library/genres/${id}`)
      .then(({ data }) => data);
  },
  addEditionType(name) {
    return axiosInstance
      .post(`Library/editiontypes`, {
        name: name,
      })
      .then(({ data }) => data);
  },
  updateEditionType(genre) {
    return axiosInstance
      .put(`Library/editiontypes`, genre)
      .then(({ data }) => data);
  },
  fetchEditionTypes() {
    return axiosInstance.get(`Library/editiontypes`).then(({ data }) => data);
  },
  deleteEditionType(id) {
    return axiosInstance
      .delete(`Library/editiontypes/${id}`)
      .then(({ data }) => data);
  },
  addPickUpPoint(point) {
    return axiosInstance
      .post(`Library/pickuppoints`, point)
      .then(({ data }) => data);
  },
  updatePickUpPoint(point) {
    return axiosInstance
      .put(`Library/pickuppoints`, point)
      .then(({ data }) => data);
  },
  fetchPickUpPoints() {
    return axiosInstance.get(`Library/pickuppoints`).then(({ data }) => data);
  },
  deletePickUpPoint(id) {
    return axiosInstance
      .delete(`Library/pickuppoints/${id}`)
      .then(({ data }) => data);
  },
  addPublishingHouse(publishingHouse) {
    return axiosInstance
      .post(`Library/publishinghouses`, publishingHouse)
      .then(({ data }) => data);
  },
  updatePublishingHouse(publishingHouse) {
    return axiosInstance
      .put(`Library/publishinghouses`, publishingHouse)
      .then(({ data }) => data);
  },
  fetchPublishingHouses() {
    return axiosInstance.get(`Library/publishinghouses`).then(({ data }) => data);
  },
  deletePublishingHouse(id) {
    return axiosInstance
      .delete(`Library/publishinghouses/${id}`)
      .then(({ data }) => data);
  },
  addAuthor(author) {
    return axiosInstance
      .post(`Library/authors`, author)
      .then(({ data }) => data);
  },
  updateAuthor(author) {
    return axiosInstance
      .put(`Library/authors`, author)
      .then(({ data }) => data);
  },
  fetchAuthors() {
    return axiosInstance.get(`Library/authors`).then(({ data }) => data);
  },
  deleteAuthor(id) {
    return axiosInstance
      .delete(`Library/authors/${id}`)
      .then(({ data }) => data);
  }
};

export default libraryApi;
