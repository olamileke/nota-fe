import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './app/components/Home/home';
import Dashboard from './app/components/Dashboard/dashboard';


function App() {

    return (
        <div>
            <ToastContainer />

            <Switch>
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/'>
                    <Home /> 
                </Route>
            </Switch>
        </div>
    )
}

export default App