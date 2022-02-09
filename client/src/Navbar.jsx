/**
 * @author Rohan Gajjar
 */

///////////// Load module start ////////////////////////////
import { React } from 'react'
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./actions";

///////////// Load module End ////////////////////////////


const Navbar = () => {
    const dispatch = useDispatch()
    const loginAuthenticateUser = useSelector(state => state.employeeReducer.loginAuthenticateUser)
    const loginStatus = useSelector(state => state.employeeReducer.loginStatus)
    const cookie = Cookies.get('jwtLogin')
    const logout = () => {
        dispatch(logoutUser())
    }
    return (
        <div className="navbar">
            <div className="items">
                <span>
                    <NavLink to="/" id="Logo" ><h1>WELCOME {loginAuthenticateUser && cookie ? `${loginAuthenticateUser.firstName} ${loginAuthenticateUser.lastName}` : null}</h1></NavLink>
                    <div><h4>{loginAuthenticateUser && cookie ? `You are signed in as ${loginAuthenticateUser.email}` : null}</h4></div>
                </span>
                <div className="itemsNav2">
                    {
                        loginStatus && (
                            <>

                                <NavLink to="/Signup" id="btn2" ><button className='reg-btn' >Registration</button></NavLink>
                                <NavLink to="/Signin" id="btn1" ><button className='signin-btn'>SIGN IN</button></NavLink>
                            </>
                        )
                    }
                    {
                        !loginStatus && (
                            <>
                                <NavLink to="/uploadFiles"><button className='uploadFiles'> UPLOAD FILES</button></NavLink>
                                <button className='logout-btn' onClick={() => logout()}>LOG OUT</button>
                            </>
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Navbar;
