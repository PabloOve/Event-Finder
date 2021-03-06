const initialState = {
  isAuthorized: false
//  isAuthorized: localStorage.getItem('isAuthorized') || false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthorized: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthorized: false,
      };
    default:
      return state;
  }
}