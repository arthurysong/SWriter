import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../components/Login'
import Client from '../components/Client'
import Invalid from '../components/Invalid'
import Test from '../components/Test';

const Routes = () => {
    return <Switch>
        <Route exact path="/" render={props => <Redirect to={`/client#state=oauth&access_token=${localStorage.getItem('access_token')}`}/>} />
        <Route path="/login" component={Login} />
        <Route path="/client" render={props => <Client {...props} />} />
        <Route path="/test" component={Test} />
        <Route exact path='*' component={Invalid} />
    </Switch>
}

export default Routes
