/**
 * @author Rohan Gajjar
 */
//////////////////// Load module start //////////////////////////////
import React, { createContext } from 'react';
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
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

//////////////////// Load module end /////////////////////////////////////////



export const loginContext = createContext();
const App = () => {
  const loginStatus = useSelector(state => state.employeeReducer.loginStatus)
  console.log("loginStatus", loginStatus);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" component={Signup} />
          <Route path="/editUser/:id" component={Signup} />
          <ProtectedRoute exact path="/logout" component={Signin} authStatus={loginStatus} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} authStatus={loginStatus} />
          {
            loginStatus !== false ? <Route exact path="/signIn" component={Signin} /> : <Redirect to="/dashboard" />
          }

          <Route path="*" component={PagenotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
