import React, { useEffect } from 'react'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Login from '../components/Login'
import Client from '../components/Client'
import Invalid from '../components/Invalid'
// import Test from '../components/Test';
import ClientLoader from '../components/ClientLoader';
import { useSelector } from 'react-redux';

const Routes = () => {
    const history = useHistory();
    const { accessToken, refreshToken } = useSelector(state => state.auth); 

    // Should only redirect to client if we have accessToken and refreshToken in storage.
    useEffect(() => {
        if (accessToken && refreshToken) {
            history.replace('/client');
        }
    }, [])

    return <Switch>
        <Route exact path="/" />
        <Route path="/login" component={Login} />
        <Route path="/client" component={ClientLoader} />
        <Route exact path='*' component={Invalid} />
    </Switch>
}

export default Routes
