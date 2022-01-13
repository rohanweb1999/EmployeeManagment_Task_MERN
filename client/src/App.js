import React, { createContext, useReducer } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from './Home.jsx';
import Logout from './Logout'
import Dashboard from './Dashboard';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import PagenotFound from './PagenotFound';
import Navbar from './Navbar';
import Cookies from 'js-cookie'



import ProtectedRoute from './ProtectedRoute';
// import { Reducers, initialState } from './reducer/authReducer';


export const loginContext = createContext();
const App = () => {
  const history = useHistory();
  const getCookie = Cookies.get('jwtLogin')

  // const [state, dispatch] = useReducer(Reducers, initialState)
  // console.log("state: ", state)
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/"  ><Home></Home></Route>
          <Route path="/signUp"><Signup></Signup></Route>
          <Route path="/editUser/:id"  ><Signup></Signup></Route>
          <ProtectedRoute exact path="/signIn" ><Signin></Signin></ProtectedRoute>
          <ProtectedRoute exact path="/logout" ><Logout></Logout></ProtectedRoute>
          <ProtectedRoute exact path="/dashboard" ><Dashboard></Dashboard></ProtectedRoute>
          <Route path="*"  ><PagenotFound></PagenotFound></Route>
        </Switch>

      </Router>
    </>
  )
}

export default App;
