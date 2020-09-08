import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './app/components/Home/home';
import AuthHome from './app/components/Auth-Home/auth-home';


function App() {

    return (
        <div>
            <ToastContainer />

            <Switch>
                <Route path='/dashboard' component={AuthHome} />
                <Route path='/' component={Home} />
            </Switch>
        </div>
    )
}

export default App