/**
 * @author Rohan Gajjar
 */
//////////////// Load module start ///////////////////////
import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//protected route
//authstate: authenticate state
//component: componenet connected with route
//...rest: rest of the properties
const ProtectedRoute = ({ authStatus, component: Component, ...rest }) => {
    const loginStatus = useSelector(state => state.employeeReducer.loginStatus)

    return (
        <>
            <Route {...rest} render={(props) => {
                if (loginStatus !== true) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to='/Dashboard' />;
                }
            }} />
        </>
    )
}

export default ProtectedRoute;
