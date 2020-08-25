import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'qs';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import './Client.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import produce from 'immer';

const Client = ({ history }) => {
    const [editorText, setEditorText] = useState('# What??');
    const [files, setFiles] = useState([]);
    const [fileIndex, setFileIndex] = useState(undefined);
    useEffect(() => {
        const queryObject = qs.parse(history.location.hash);
        // axios.get('https://www.googleapis.com/drive/v2/files', {
        //     headers: {
        //         authorization: `Bearer ${queryObject.access_token}`
        //     }
        // })
        //     .then(resp => {
        //         console.log(resp.data)
        //         setFiles(resp.data.items.map(i => i.title))
        //         localStorage.setItem('access_token', queryObject.access_token);

        //     })
        //     .catch(err => {
        //         if (err.response.status === 401) {
        //             localStorage.setItem('access_token', undefined);

        //             history.replace('/login');
        //         }
        //     });

        // const response = await axios.$get('/api/slider', { params });
        axios.get('https://www.googleapis.com/drive/v3/files', {
            headers: { authorization: `Bearer ${queryObject.access_token}` },
            params: { q: "mimeType='application/vnd.google-apps.folder'andname='SWriter'" }})
            .then(resp => {
                console.log(resp.data)
                // also we should set localStorage
                localStorage.setItem('access_token', queryObject.access_token);

                // if we have 'swriter folder' we can use that to create files in
                // if we don't have 'swriter' we need to create a SWriter folder
                if (resp.data.files.length) {
                    // show the files in SWriter
                    const id = resp.data.files[0].id;
                    console.log(id)
                    // axios.get(`https://www.googleapis.com/drive/v2/files/${id}/children`, {
                    //     headers: { authorization: `Bearer ${queryObject.access_token}` }})
                    //     // we can only search for files..
                    //     .then(resp => {
                    //         // then handle files..
                    //         console.log(resp.data);

                    //     })
                    axios.get(`https://www.googleapis.com/drive/v2/files/${id}/children`, {
                        headers: { authorization: `Bearer ${queryObject.access_token}` },
                        // })
                        params: { q: "mimeType!='application/vnd.google-apps.folder'" }})
                        // here we can grab all the folders and get content for each file?
                        .then(resp => {
                            console.log('only files', resp.data)
                            resp.data.items.forEach(i => {
                                // setFiles(files => [])
                                axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}/export`, {
                                headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                                params: { mimeType: "text/plain" },
                                // params: { mimeType: "application/pdf" },

                                    // Accept: "application/json"
                                // },
                            })
                                .then(resp =>{
                                    console.log(resp.data)
                                    console.log(resp.data.split('\n')[0])
                                    const file = {
                                        title: resp.data.split('\n')[0],          
                                        content: resp.data,          
                                    }
                                    // console.log(marked(resp.data))
                                    setFiles(files => [...files, file])
                                })
                            })
                        })

                } else {
                    // create a new folder called SWriter
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.setItem('access_token', undefined);

                    history.replace('/login');
                }
            })
    }, [history])

    return <div data-test="client" className="client">
        <h1>Welcome to your Client</h1>
        {files.length > 0 && files.map((f, index) => 
            <Markdown onClick={() => {
                setEditorText(f.content)
                setFileIndex(index)
                }} 
                key={index} 
                className="client__fileTitle">{f.title}</Markdown>)}
        <MdEditor 
            value={editorText}
            renderHTML={(text) => <Markdown >{text}</ Markdown>} 
            onChange={({ html, text }) => {
                setEditorText(text)
                setFiles(produce(files, draft => { draft[fileIndex].content = text }))
            }}/>
    </div>
}

export default Client