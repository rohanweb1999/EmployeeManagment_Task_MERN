import { React, useEffect, useState } from 'react'
// import Axios from "axios";
import 'antd/dist/antd.css';
import { NavLink, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { logoutUser } from './actions';
// import { Reducers, initialState } from './reducer/authReducer';

// export const loginContext = createContext();

const Navbar = () => {

    const dispatch = useDispatch()
    const getCookie = Cookies.get('jwtLogin')

    const history = useHistory()
    const [toggleButton, settoggleButton] = useState()
    // const [state, dispatch] = useReducer(Reducers, initialState)

    // const history = useHistory();
    const registration = () => {
        Cookies.remove('jwtLogin')
        // dispatch({ type: 'LoginUser', payload: false })
    }
    const signin = () => {
        Cookies.remove('jwtLogin')
    }
    const home = () => {
        Cookies.remove('jwtLogin')

    }

    return (
        <div className="navbar">
            <div className="items">
                <NavLink to="/" id="Logo" onClick={home}><h1>WELCOME</h1></NavLink>
                <div className="itemsNav2">

                    <NavLink to="/Signup" id="btn2" ><button className='reg-btn' onClick={registration}>Registration</button></NavLink>
                    <NavLink to="/Signin" id="btn1" ><button className='signin-btn' onClick={signin}>SIGN IN</button></NavLink>




                </div>
            </div>

        </div>
    )
}

export default Navbar;
