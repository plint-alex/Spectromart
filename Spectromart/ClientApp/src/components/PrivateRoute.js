import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

let PrivateRoute = ({ component: Component, ...rest }) => {

    const location1 = window.location;
    return (
        <Route {...rest} render={props => {
            const location = window.location;
            //window.location.href.includes('/seo/')
            return rest.isLoggedIn
                ? <Component {...props} />
                : props.location.pathname === '/admin'
                    ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    : <Component {...props} />;
        }} />
    );
};

let mapState = (state) => {

    return {
        isLoggedIn: state.authentication && state.authentication.auth
    };
};

PrivateRoute = connect(mapState)(PrivateRoute);

export { PrivateRoute };