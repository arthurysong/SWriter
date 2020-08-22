import React from 'react'
import { oauth } from '../utils/googleDrive'

const Login = () => {
    return <div>
        <h1>SWriter</h1>
        <p>Free synced Journal using Google Drive</p>
        <button onClick={oauth}>Continue With Google</button>    
    </div>
}

export default Login
