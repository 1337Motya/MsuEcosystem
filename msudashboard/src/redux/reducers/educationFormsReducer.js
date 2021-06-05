const initialState = {
    educationForms: [],
    currentEducationForm: {},
    isLoaded: false,
  };
  
  const educationForms = (state = initialState, action) => {
    switch (action.type) {
      case "SET_EDUCATIONFORMS":
        return {
          ...state,
          educationForms: action.payload,
          isLoaded: true,
        };
      case "SET_EDUCATIONFORM":
        return {
          ...state,
          currentEducationForm: action.payload,
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
  
  export default educationForms;