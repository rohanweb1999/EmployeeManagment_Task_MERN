/**
 * @author Rohan Gajjar
 */

///////////// Load module start ////////////////////////////
import { React } from 'react'
import 'antd/dist/antd.css';
import { NavLink, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./actions";
import { useEffect } from 'react';
import { useState } from 'react';

///////////// Load module End ////////////////////////////


const Navbar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const loginAuthenticateUser = useSelector(state => state.employeeReducer.loginAuthenticateUser)
    const loader = useSelector(state => state.employeeReducer.loader)
    const loginStatus = useSelector(state => state.employeeReducer.loginStatus)
    // const cookie = Cookies.get('jwtLogin')
    const logout = () => {
        history.push('/')
        dispatch(logoutUser())
    }

    return (
        <div className="navbar">
            <div className="items">
                <span>
                    <NavLink to="/" id="Logo" ><h1>WELCOME {loginAuthenticateUser || loginStatus === false ? `${loginAuthenticateUser.firstName} ${loginAuthenticateUser.lastName}` : null}</h1></NavLink>
                    <div><h4>{loginAuthenticateUser || loginStatus === false ? `You are signed in as ${loginAuthenticateUser.email}` : null}</h4></div>
                </span>
                <div className="itemsNav2">


                    {
                        loginStatus === false ? (
                            <>
                                <NavLink to="/uploadFiles"><button className='uploadFiles' > UPLOAD FILES</button></NavLink>
                                <button className='logout-btn' onClick={() => logout()} disabled={loader}>LOG OUT</button>
                            </>) : (
                            <>
                                <NavLink to="/Signup" id="btn2" ><button className='reg-btn' >Registration</button></NavLink>
                                <NavLink to="/Signin" id="btn1" ><button className='signin-btn' >SIGN IN</button></NavLink>
                            </>
                        )
                    }


                </div>

            </div>

        </div>
    )
}

export default Navbar;
