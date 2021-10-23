import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'

function Home() {
 // let store = createStore(reducer) /events /sign_in /events/1107
  const { isAuthorized } = useSelector(state => state.authReducer)

 return <Redirect to={ isAuthorized ? '/events' : '/sign_in' }/>;
};

  export default Home;