/**
 * @author Rohan Gajjar
 */

///////////// Load module start ////////////////////////////
import { React, useState } from 'react'
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./actions";

///////////// Load module End ////////////////////////////


const Navbar = () => {
    const dispatch = useDispatch
    const loginAuthenticateUser = useSelector(state => state.employeeReducer.loginAuthenticateUser)
    const loginStatus = useSelector(state => state.employeeReducer.loginStatus)

    const logout = () => {
        dispatch(logoutUser())
    }
    return (
        <div className="navbar">
            <div className="items">
                <span>
                    <NavLink to="/" id="Logo" ><h1>WELCOME {loginAuthenticateUser ? `${loginAuthenticateUser.firstName} ${loginAuthenticateUser.lastName}` : null}</h1></NavLink>
                    <div><h4>{loginAuthenticateUser ? `You are signed in as ${loginAuthenticateUser.email}` : null}</h4></div>
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

                            <button className='logout-btn' onClick={() => logout()}>LOG OUT</button>


                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Navbar;
