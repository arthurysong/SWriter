import React from 'react'
import { oauth } from '../../utils/googleDrive'
import { oauth2 } from '../../utils/medium';
import axios from 'axios'
import { API_URL } from '../../utils/URL';
import './Login.scss';

const Login = () => {
    // console.log('process.env', process.env);

    return <div className="login">
        <div className="login__background"></div>
        <div className="login__container">
            <h1 className="login__title">SWriter</h1>
            <p className="login__description">A journaling app that posts to Medium. Organize and automate blogging.</p>
            {/* <button onClick={oauth}>Continue With Google</button>     */}
            {/* Here I want to click and log in via Medium... */}
            {/* <button onClick={oauth}>Continue with Google</button> */}
            <div className="login__button" onClick={oauth2}>Continue with Medium</div>
        </div>
    </div>
}

export default Login
