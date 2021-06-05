const initialState = {
  genres: [],
  editionTypes: [],
  pickUpPoints: [],
  publishingHouses: [],
  authors: [],
  isLoaded: false,
};

const library = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GENRES":
      return {
        ...state,
        genres: action.payload,
        isLoaded: true,
      };
    case "SET_EDITIONTYPES":
      return {
        ...state,
        editionTypes: action.payload,
        isLoaded: true,
      };
    case "SET_PICKUPPOINTS":
      return {
        ...state,
        pickUpPoints: action.payload,
        isLoaded: true,
      };
    case "SET_PUBLISHINGHOUSES":
      return {
        ...state,
        publishingHouses: action.payload,
        isLoaded: true,
      };
    case "SET_AUTHORS":
      return {
        ...state,
        authors: action.payload,
        isLoaded: true,
      };
    case "SET_LOADED":
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default library;
