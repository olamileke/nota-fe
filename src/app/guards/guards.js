// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const AuthGuard = ({ Component:Component, isAuthenticated, ...rest }) => {
//     <Route {...rest} render={(props) => (
//         isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
//     )} />
// }

// const GuestGuard = ({ Component:Component, isAuthenticated, ...rest }) => {
//     <Route {...rest} render={(props) => (
//         isAuthenticated ? <Redirect to='/' /> : ''
//     )} />
// }

// export { AuthGuard,GuestGuard };