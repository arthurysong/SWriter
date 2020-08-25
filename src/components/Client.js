import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'qs';
import axios from 'axios';

const Client = ({ history }) => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        const queryObject = qs.parse(history.location.hash);
        axios.get('https://www.googleapis.com/drive/v2/files', {
            headers: {
                authorization: `Bearer ${queryObject.access_token}`
            }
        })
            .then(resp => {
                setFiles(resp.data.items.map(i => i.title))
                localStorage.setItem('access_token', queryObject.access_token);

            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.setItem('access_token', undefined);

                    history.replace('/login');
                }
            });
    }, [history])

    return <div data-test="client" className="client">
        Welcome to your Client
        {files.length > 0 && files.map((f, index) => <h6 key={index}>
            {f}
        </h6>)}
    </div>
}

export default Client