
//////////////////// Load module start //////////////////////////////
import React, { createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";
import Home from './Home.jsx';
import Dashboard from './Dashboard';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import PagenotFound from './PagenotFound';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';

//////////////////// Load module end /////////////////////////////////////////


export const loginContext = createContext();
const App = () => {


  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/"  ><Home></Home></Route>
          <Route path="/signUp"><Signup></Signup></Route>
          <Route path="/editUser/:id"  ><Signup></Signup></Route>
          <Route path='/dashboard/getUserBy/:sortBy'><Dashboard></Dashboard></Route>
          <Route path='/dashboard/getUserBy/page/:pageNumber'><Dashboard></Dashboard></Route>

          <ProtectedRoute exact path="/signIn" ><Signin></Signin></ProtectedRoute>
          <ProtectedRoute exact path="/logout" ><Signin></Signin></ProtectedRoute>
          <ProtectedRoute path="/dashboard" ><Dashboard></Dashboard></ProtectedRoute>
          <Route path="*"  ><PagenotFound></PagenotFound></Route>
        </Switch>

      </Router>
    </>
  )
}

export default App;
