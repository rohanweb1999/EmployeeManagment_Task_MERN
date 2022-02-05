/**
 * @author Rohan Gajjar
 */
//////////////// Load module start ///////////////////////
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

//protected route
//authstate: authenticate state
//component: componenet connected with route
//...rest: rest of the properties
const ProtectedRoute = ({ authStatus, component: Component, ...rest }) => {

    console.log("authStatus", authStatus);
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
