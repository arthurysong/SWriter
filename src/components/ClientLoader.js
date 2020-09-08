import React, { useEffect } from 'react'
import qs from 'qs';
import axios from 'axios';
import { API_URL } from '../utils/URL';

const ClientLoader = ({ history }) => {
    // on mount should fetch all files
    // once files are loaded we should display client.
    useEffect(() => {
        const queryObject = qs.parse(history.location.search.substring(1));
        console.log('history', history);
        console.log('queryObject', queryObject)

        // get access token from medium.
        // const body = {
        //     code: queryObject.code,
        //     client_id: process.env.REACT_APP_MEDIUM_ID,
        //     client_secret: process.env.REACT_APP_MEDIUM_SECRET,
        //     grant_type: 'authorization_code',
        //     redirect_uri: 'http://127.0.0.1:3000/client'

        // }
        // axios.post('https://api.medium.com', qs.stringify(body), {
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     crossdomain: true
        // })
        //     .then(resp => console.log(resp.data))
        //     .catch(err => console.log(err.response.data))
        axios.post(`${API_URL}/users/medium`, {
            queryObject
        })
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));

        // get profile information using access_token

        // use state and profile information to get files from express API
    }, [])

    // console.log('queryObject', queryObject)
    return <div>
        Loading...
    </div>
}

export default ClientLoader
