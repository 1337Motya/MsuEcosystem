const initialState = {
    teachers: [],
    currentTeacher: {},
    isLoaded: false,
  };
  
  const teachers = (state = initialState, action) => {
    switch (action.type) {
      case "SET_TEACHERS":
        return {
          ...state,
          teachers: action.payload,
          isLoaded: true,
        };
      case "SET_TEACHER":
        return {
          ...state,
          currentTeacher: action.payload,
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
  
  export default teachers;