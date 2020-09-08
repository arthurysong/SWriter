import React, { useEffect, useState } from 'react'
import qs from 'qs';
import axios from 'axios';
import { API_URL } from '../utils/URL';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../actions';
import Client from './Client';
// import Loader from 'halogen/PacmanLoader';
import PacmanLoader from 'react-spinners/PacmanLoader';
import './ClientLoader.scss';

const ClientLoader = ({ history }) => {
    // on mount should fetch all files
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // once files are loaded we should display client.
    useEffect(() => {
        const queryObject = qs.parse(history.location.search.substring(1));
        // console.log('history', history);
        // console.log('queryObject', queryObject)

        // if we don't have access_token and refresh token.. do blank..
        if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
            axios.post(`${API_URL}/users/medium`, {
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token'),
            })
                .then(resp => {
                    console.log(resp.data)
                    const { access_token, refresh_token, name, username, notebooks } = resp.data;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    dispatch(setUserInfo(name, username, notebooks))
                    setTimeout(() => setLoading(false), 1000);
                    // setLoading(false);
                })
                .catch(err => console.log(err));

        } else {
            axios.post(`${API_URL}/users/medium-oauth`, {
                queryObject
            })
                .then(resp => {
                    console.log(resp.data)
                    const { access_token, refresh_token, name, username, notebooks } = resp.data;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    dispatch(setUserInfo(name, username, notebooks))
                    setTimeout(() => setLoading(false), 1000);
                    // setLoading(false);
                    // set localStorage refreshToken and access_token
                    // set user info in redux store.
                    // set all notebooks in redux store.
                })
                .catch(err => console.log(err));
        }
        
    }, [])

    if (loading) {
        return <div className="clientLoader">
            <div className="clientLoader__box">
                <div className="clientLoader__text">Loading...</div>
                <PacmanLoader loading={loading} color="#26a65b" size="32px" margin="4px"/>
            </div>
            {/* Loading... */}
        </div>
    }
    return <Client />
}

export default ClientLoader
