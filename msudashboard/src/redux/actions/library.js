import libraryApi from "../../api/libraryApi";

export const addGenre = (name) => (dispatch) => {
  libraryApi.addGenre(name).then((data) => {
    console.log(data);
    dispatch(fetchGenres());
  });
};

export const updateGenre = (genre) => (dispatch) => {
  libraryApi.updateGenre(genre).then((data) => {
    console.log(data);
    dispatch(fetchGenres());
  });
};

export const fetchGenres = () => (dispatch) => {
  dispatch(setStatus(false));
  libraryApi.fetchGenres().then((data) => {
    dispatch(setGenres(data));
  });
};

export const deleteGenre = (id) => (dispatch) => {
    libraryApi.deleteGenre(id).then((data) => {
    console.log(data);
    dispatch(fetchGenres());
  });
};

export const setGenres = (items) => ({
  type: "SET_GENRES",
  payload: items,
});

export const addEditionType = (name) => (dispatch) => {
    libraryApi.addEditionType(name).then((data) => {
      console.log(data);
      dispatch(fetchEditionTypes());
    });
  };
  
  export const updateEditionType = (genre) => (dispatch) => {
    libraryApi.updateEditionType(genre).then((data) => {
      console.log(data);
      dispatch(fetchEditionTypes());
    });
  };
  
  export const fetchEditionTypes = () => (dispatch) => {
    dispatch(setStatus(false));
    libraryApi.fetchEditionTypes().then((data) => {
      dispatch(setEditionTypes(data));
    });
  };
  
  export const deleteEditionType = (id) => (dispatch) => {
      libraryApi.deleteEditionType(id).then((data) => {
      console.log(data);
      dispatch(fetchEditionTypes());
    });
  };
  
  export const setEditionTypes = (items) => ({
    type: "SET_EDITIONTYPES",
    payload: items,
  });

  export const addPickUpPoint = (point) => (dispatch) => {
    libraryApi.addPickUpPoint(point).then((data) => {
      console.log(data);
      dispatch(fetchPickUpPoints());
    });
  };
  
  export const updatePickUpPoint = (point) => (dispatch) => {
    libraryApi.updatePickUpPoint(point).then((data) => {
      console.log(data);
      dispatch(fetchPickUpPoints());
    });
  };
  
  export const fetchPickUpPoints = () => (dispatch) => {
    dispatch(setStatus(false));
    libraryApi.fetchPickUpPoints().then((data) => {
      dispatch(setPickUpPoints(data));
    });
  };
  
  export const deletePickUpPoint = (id) => (dispatch) => {
      libraryApi.deletePickUpPoint(id).then((data) => {
      console.log(data);
      dispatch(fetchPickUpPoints());
    });
  };
  
  export const setPickUpPoints = (items) => ({
    type: "SET_PICKUPPOINTS",
    payload: items,
  });

  export const addPublishingHouse = (publishingHouse) => (dispatch) => {
    libraryApi.addPublishingHouse(publishingHouse).then((data) => {
      console.log(data);
      dispatch(fetchPublishingHouses());
    });
  };
  
  export const updatePublishingHouse = (publishingHouse) => (dispatch) => {
    libraryApi.updatePublishingHouse(publishingHouse).then((data) => {
      console.log(data);
      dispatch(fetchPublishingHouses());
    });
  };
  
  export const fetchPublishingHouses = () => (dispatch) => {
    dispatch(setStatus(false));
    libraryApi.fetchPublishingHouses().then((data) => {
      dispatch(setPublishingHouses(data));
    });
  };
  
  export const deletePublishingHouse = (id) => (dispatch) => {
      libraryApi.deletePublishingHouse(id).then((data) => {
      console.log(data);
      dispatch(fetchPublishingHouses());
    });
  };
  
  export const setPublishingHouses = (items) => ({
    type: "SET_PUBLISHINGHOUSES",
    payload: items,
  });

  export const addAuthor = (author) => (dispatch) => {
    libraryApi.addAuthor(author).then((data) => {
      console.log(data);
      dispatch(fetchAuthors());
    });
  };
  
  export const updateAuthor = (author) => (dispatch) => {
    libraryApi.updateAuthor(author).then((data) => {
      console.log(data);
      dispatch(fetchAuthors());
    });
  };
  
  export const fetchAuthors = () => (dispatch) => {
    dispatch(setStatus(false));
    libraryApi.fetchAuthors().then((data) => {
      dispatch(setAuthors(data));
    });
  };
  
  export const deleteAuthor = (id) => (dispatch) => {
      libraryApi.deleteAuthor(id).then((data) => {
      console.log(data);
      dispatch(fetchAuthors());
    });
  };
  
  export const setAuthors = (items) => ({
    type: "SET_AUTHORS",
    payload: items,
  });

export const setStatus = (status) => ({
  type: "SET_LOADED",
  payload: status,
});
