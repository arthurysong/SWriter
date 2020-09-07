import React from 'react'
import { oauth } from '../utils/googleDrive'
import axios from 'axios'
import { API_URL } from '../utils/URL';

const Login = () => {
    const auth = () => {
        // axios.get(`https://medium.com/m/oauth/authorize?client_id=${process.env.REACT_APP_MEDIUM_ID}
        axios.get(`https://cors-anywhere.herokuapp.com/https://medium.com/m/oauth/authorize?client_id=${process.env.REACT_APP_MEDIUM_ID}
            &scope=basicProfile,publishPost
            &state=MY_STATE
            &response_type=code
            &redirect_uri=https://swriter.herokuapp.com`)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err.response.data));
    }

    // console.log('process.env', process.env.REACT_APP_MEDIUM_ID);
    // console.log('process.env', process.env);

    return <div>
        <h1>SWriter</h1>
        <p>Free synced Journal using Google Drive</p>
        <button onClick={oauth}>Continue With Google</button>    
        {/* Here I want to click and log in via Medium... */}
        <button onClick={auth}>Continue with Medium</button>
    </div>
}

export default Login
