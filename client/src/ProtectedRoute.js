/**
 * @author Rohan Gajjar
 */



//////////////// Load module start ///////////////////////
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
/////////////// Load module End //////////////////////////

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <>
            <Route {...rest} render={(props) => {
                if (auth) return <Component {...props} />;
                if (!auth) return <Redirect to={{ path: "/signin", state: { from: props.location } }} />
            }}
            />
        </>
    )
}

export default ProtectedRoute
