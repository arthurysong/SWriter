import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../components/Login'
import Invalid from '../components/Invalid'
// import ClientLoader from '../components/ClientLoader';
import Client from '../components/Client/Client';
import { useSelector } from 'react-redux';

const Routes = () => {
    const { accessToken, refreshToken } = useSelector(state => state.auth); 

    return <Switch>
        <Route exact path="/" render={() => <Redirect to={accessToken && refreshToken ? '/client' : '/login'}/>} />
        <Route path="/login" component={Login} />
        <Route path="/client" component={Client} />
        <Route exact path='*' component={Invalid} />
    </Switch>
}

export default Routes
