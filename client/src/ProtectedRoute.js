/**
 * @author Rohan Gajjar
 */
//////////////// Load module start ///////////////////////
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useState } from 'react';



//protected route
//authstate: authenticate state
//component: componenet connected with route
//...rest: rest of the properties
const ProtectedRoute = ({ authStatus, component: Component, ...rest }) => {
    const loginStatus = useSelector(state => state.employeeReducer.loginStatus)
    // console.log("loginstatus", loginStatus);
    // const [cookie, setCookie] = useState()
    // useEffect(() => {
    //     const cookie = Cookies.get('jwtLogin')
    //     setCookie(cookie)

    // }, [cookie])

    return (
        <>
            <Route {...rest} render={(props) => {
                if (authStatus !== true) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to='/' />;
                }
            }} />
        </>
    )
}

export default ProtectedRoute;
