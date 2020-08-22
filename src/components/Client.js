import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'qs';
import axios from 'axios';

const Client = ({ }) => {
    const [files, setFiles] = useState([]);
    // console.log(match);

    const history = useHistory();
    // console.log(history);
    useEffect(() => {
        const queryObject = qs.parse(history.location.hash);
        console.log(queryObject);
        if (queryObject['#state'] === 'oauth') {
            // we are authorized..
            axios.get('https://www.googleapis.com/drive/v2/files', {
                headers: {
                    authorization: `Bearer ${queryObject.access_token}`
                }
            })
                .then(resp => {
                    console.log(resp.data.items);
                    setFiles(resp.data.items.map(i => i.title))
                    // resp.data.items.forEach((i, index) => {
                    //     setFiles(files => [...files, i.title])
                    // })
                });
        } else {
            // we aren't authorized.
        }
        return () => {
            
        }
    }, [history])

    // console.log('files', files)
    return <div>
        You are authorized.
        {/* File titles */}
        {files.length > 0 && files.map((f, index) => <h6 key={index}>
            {f}
        </h6>)}
    </div>
}

export default Client