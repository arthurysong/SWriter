import React from 'react'
import { oauth2 } from '../../utils/medium';
import './Login.scss';

const Login = () => {
    return <div className="login">
        <div className="login__background"></div>
        <div className="login__container">
            <h1 className="login__title">SWriter</h1>
            <p className="login__description">A journaling app that posts to Medium. Organize and automate blogging.</p>
            <div className="login__button" onClick={oauth2}>Continue with Medium</div>
        </div>
    </div>
}

export default Login
