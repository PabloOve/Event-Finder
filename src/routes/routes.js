import React from 'react';

import {connect, useSelector} from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from '../app/components/AuthenticatedRoute';
import Home from '../app/components/home';
import SignUpForm from "../app/components/Login/signUp"
import SignInForm from "../app/components/Login/SignIn"
import {Redirect} from "react-router-dom";
import Events from "../app/components/Events"
import Event from "../app/components/Event"
import NewEvent from "../app/components/NewEvent.tsx"

function Routes(props) {
  const { isAuthorized } = useSelector(state => state.authReducer);

  /*
  function handleLogout() {
    props.signOutUser()
    // props.history.push(`/`)
    return <Redirect to="/"/>
  }
*/
  return (
  <Router>
    <div className="App">

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={SignInForm} />
            <Route path="/sign_up" component={SignUpForm} />
            <AuthenticatedRoute path='/events' component={Events} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/event/:id' component={Event} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/newEvent' component={NewEvent} isAuthenticated={isAuthorized} />
          </Switch>
    </div>
  </Router>
  );
}
const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized
  })
  
  //  const { isAuthorized } = useSelector(state => state.auth);
  const mapDispatchToProps = dispatch =>({
      handleLogout(){
          dispatch({
              type: 'LOGOUT'
          })
          return <Redirect to="/"/>
      }
  }) 


export default connect(mapStateToProps, mapDispatchToProps)(Routes);