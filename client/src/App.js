/**
 * @author Rohan Gajjar
 */
//////////////////// Load module start //////////////////////////////
import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect

} from "react-router-dom";
import Home from './Home.jsx';
import Dashboard from './Dashboard';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import PagenotFound from './PagenotFound';
import Navbar from './Navbar';
import UploadFiles from './fileUpload/UploadFiles'
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie'

//////////////////// Load module end /////////////////////////////////////////


export const loginContext = createContext();
const App = () => {
  const cookie = Cookies.get('jwtLogin')

  const loginStatus = useSelector(state => state.employeeReducer.loginStatus)
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" component={Signup} />
          <Route path="/editUser/:id" component={Signup} />
          <ProtectedRoute path="/uploadFiles" component={UploadFiles} authStatus={cookie} />
          <Route exact path="/logout" component={Signin} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} authStatus={cookie} />
          {
            cookie === undefined || loginStatus === true ? (
              <>
                <Route exact path='/signIn' component={Signin} />

                <Route exact path='/signUp' component={Signup} />
              </>
            ) : <Redirect to='/Dashboard' />
          }

          <Route path="*" component={PagenotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
