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
    const [cookieStatus, setcookieStatus] = useState('')
    useEffect((e) => {
        const cookie = Cookies.get('jwtLogin')
        if (cookie) {
            setcookieStatus(cookie)
        }
    }, [cookieStatus])
    const dispatch = useDispatch();


    const registration = () => {
        Cookies.remove('jwtLogin')
    }
    const signin = () => {
        Cookies.remove('jwtLogin')
    }
    const home = () => {
        Cookies.remove('jwtLogin')

    }
    console.log("cookie", cookieStatus);
    return (
        <div className="navbar">
            <div className="items">
                <NavLink to="/" id="Logo" onClick={home}><h1>WELCOME</h1></NavLink>
                {
                    cookieStatus ? <div className="itemsNav2">
                        <NavLink to="/Signup" id="btn2" ><button className='reg-btn' onClick={registration}>Registration</button></NavLink>
                        <NavLink to="/logout"><button className='logout-btn' onClick={() => dispatch(logoutUser())}>LOG OUT</button></NavLink>

                    </div>
                        :
                        <div className="itemsNav2">
                            <NavLink to="/Signup" id="btn2" ><button className='reg-btn' onClick={registration}>Registration</button></NavLink>
                            <NavLink to="/Signin" id="btn1" ><button className='signin-btn' onClick={signin}>SIGN IN</button></NavLink>
                        </div>
                }


            </div>

        </div>
    )
}

export default Navbar;
