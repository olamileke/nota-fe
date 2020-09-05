import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './app/components/Home/home';

function App() {

    return (
        <Switch>
            <Route path='/'>
                <Home /> 
            </Route>
        </Switch>
    )
}

export default App