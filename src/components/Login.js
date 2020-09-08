import React from 'react'
import { oauth } from '../utils/googleDrive'
import { oauth2 } from '../utils/medium';
import axios from 'axios'
import { API_URL } from '../utils/URL';

const Login = () => {
    console.log('process.env', process.env);

    return <div>
        <h1>SWriter</h1>
        <p>Free synced Journal using Google Drive</p>
        {/* <button onClick={oauth}>Continue With Google</button>     */}
        {/* Here I want to click and log in via Medium... */}
        {/* <button onClick={auth}>Continue with Medium</button> */}
        <button onClick={oauth2}>Continue with Medium</button>
    </div>
}

export default Login
