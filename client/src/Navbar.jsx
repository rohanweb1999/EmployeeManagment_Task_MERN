/**
 * @author Rohan Gajjar
 */

///////////// Load module start ////////////////////////////
import { React } from 'react'
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
///////////// Load module End ////////////////////////////


const Navbar = () => {



    const registration = () => {
        Cookies.remove('jwtLogin')
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
