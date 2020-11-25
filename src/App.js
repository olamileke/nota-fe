import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './app/components/Home/home';
import AuthHome from './app/components/Auth-Home/auth-home';


class App extends React.Component {
    
    constructor(props) {
        super(props);
        window.addEventListener("popstate", e => {
            this.props.history.go(1);
        })
    }

    render() {

        const GuardedRoute = ({ component: Component, auth, ...rest }) => (
            <Route {...rest} render={(props) => (
                auth === true ? <Component {...props} /> : <Redirect to='/' />
            )} />
        )

        const isAuthenticated = localStorage.getItem('nota_token') ? true : false;

        return (
            <div>
                <ToastContainer />

                <Switch>
                    <GuardedRoute path='/dashboard' component={AuthHome} auth={isAuthenticated} />
                    <Route path='/dashboard' component={AuthHome} />
                    <Route path='/email/confirm/:token' component={Home} />
                    <Route path='/password/change/:token' component={Home} />
                    <Route path='/' component={Home} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)