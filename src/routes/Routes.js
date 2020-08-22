import React from 'react'
import { Route } from 'react-router-dom';
import Login from '../components/Login'
import Client from '../components/Client'
import SetLogin from '../components/SetLogin';

const Routes = () => {
    return <div>
        <Route exact path="/" component={SetLogin} />
        <Route path="/login" component={Login} />
        <Route path="/client" component={Client} />
    </div>
}

export default Routes
