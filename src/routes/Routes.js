import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../components/Login/Login'
import Invalid from '../components/Invalid'
import Client from '../components/Client/Client';
import LandingPage from '../components/LandingPage/LandingPage';

const Routes = () => {
    // const { accessToken, refreshToken } = useSelector(state => state.auth); 

    return <Switch>
        {/* <Route exact path="/" render={() => <Redirect to={accessToken && refreshToken ? '/client' : '/login'}/>} /> */}
        <Route exact path="/" render={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/client" component={Client} />
        <Route exact path='*' component={Invalid} />
    </Switch>
}

export default Routes
