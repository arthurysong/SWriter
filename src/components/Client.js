import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import qs from 'qs';
import axios from 'axios';

const Client = ({ history }) => {
    const [files, setFiles] = useState([]);
    // console.log(match);

    // const history = useHistory();
    // console.log(history);
    useEffect(() => {
        // console.log(history.location);
        const queryObject = qs.parse(history.location.hash);
        // console.log(queryObject);
        if (queryObject['#state'] === 'oauth') {
            console.log("allo??")
            // we are authorized..
            axios.get('/work')
                .then(resp => console.log(resp));

            axios.get('https://www.googleapis.com/drive/v2/files', {
                headers: {
                    authorization: `Bearer ${queryObject.access_token}`
                }
            })
                .then(resp => {
                    console.log("why isn't my request going through??")
                    console.log(resp.data.items);
                    localStorage.setItem('refresh_token', queryObject.code);
                    setFiles(resp.data.items.map(i => i.title))
                    // resp.data.items.forEach((i, index) => {
                    //     setFiles(files => [...files, i.title])
                    // })
                })
                .catch(err => {
                    console.log(err.response)
                    if (err.response.status === 401) {
                        console.log('i made it');
                        history.replace('/login')
                    }
                });
        } else {
            // we aren't authorized.
        }
        return () => {
            
        }
    }, [history])

    // console.log('files', files)
    return <div data-test="client">
        Welcome to your Client
        {/* File titles */}
        {files.length > 0 && files.map((f, index) => <h6 key={index}>
            {f}
        </h6>)}
    </div>
}

export default Client