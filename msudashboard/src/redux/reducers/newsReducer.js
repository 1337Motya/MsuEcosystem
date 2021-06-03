const initialState = {
    drafts: [],
    reviews: [],
    publications: [],
    currentDraft: {},
    currentPublication: {},
    currentReview: {},
    isLoaded: false,
  };
  
  const news = (state = initialState, action) => {
    switch (action.type) {
      case "SET_DRAFTS":
        return {
          ...state,
          drafts: action.payload,
          isLoaded: true,
        };
      case "SET_DRAFT":
        return {
          ...state,
          currentDraft: action.payload,
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
  
  export default news;