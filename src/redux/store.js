import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index'

import thunk from 'redux-thunk';
/*
const initialState = {
    isAuthorized: true
  //  isAuthorized: localStorage.getItem('isAuthorized') || false,
  }
  
  const authReducer = (state = initialState, action) => {
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
*/


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer);
//export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));