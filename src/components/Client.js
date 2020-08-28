import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'qs';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import './Client.scss';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Main from './Main';
import SideBar from './SideBar';
import produce from 'immer';
import { useDispatch } from 'react-redux';
import { setFileName, setFileText } from '../actions';

const Client = ({ history }) => {
    // const [editorText, setEditorText] = useState('# What??');
    // const [files, setFiles] = useState([]);
    // const [fileIndex, setFileIndex] = useState(undefined);
    const dispatch = useDispatch();
    useEffect(() => {
        const queryObject = qs.parse(history.location.hash);
        axios.get('https://www.googleapis.com/drive/v3/files', {
            headers: { authorization: `Bearer ${queryObject.access_token}` },
            params: { q: "mimeType='application/vnd.google-apps.folder'andname='SWriter'" }})
            .then(resp => {
                console.log(resp.data);
                localStorage.setItem('access_token', queryObject.access_token);

                // if we have 'swriter folder' we can use that to create files in
                // if we don't have 'swriter' we need to create a SWriter folder
                // console.log(resp.data.files.length)
                if (resp.data.files.length) {
                    const id = resp.data.files[0].id;
                    axios.get(`https://www.googleapis.com/drive/v2/files/${id}/children`, {
                        headers: { authorization: `Bearer ${queryObject.access_token}` },
                        params: { 
                            q: "mimeType!='application/vnd.google-apps.folder'",
                            // fields: "title"
                        }})
                        .then(resp => {
                            console.log('only files', resp.data)
                            resp.data.items.forEach(i => {
                                axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}/`, {
                                    headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                                })
                                    .then(resp => {
                                        console.log('item desc', resp.data)
                                        dispatch(setFileName(resp.data))
                                    });
                                axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}/export`, {
                                    headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                                    params: { mimeType: "text/plain" },
                                })
                                    .then(resp =>{
                                        console.log('text', resp)
                                        dispatch(setFileText(i.id, resp.data))
                                        // console.log(resp.data.split('\n')[0])
                                        // const file = {
                                        //     title: resp.data.split('\n')[0],          
                                        //     content: resp.data,          
                                        // }
                                        // console.log(marked(resp.data))
                                        // setFiles(files => [...files, file])
                                    })
                            })
                        })

                } else {
                    // create a new folder called SWriter
                    axios.post('https://www.googleapis.com/drive/v3/files', 
                    {
                        "mimeType": "application/vnd.google-apps.folder",
                        "name": "SWriter"
                    }, {
                        headers: { 
                            authorization: `Bearer ${queryObject.access_token}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        }})
                        .then(resp => console.log('SWriter successfully created'));
                }
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    localStorage.setItem('access_token', undefined);
                    history.replace('/login');
                }
            })
    }, [history])

    return <div data-test="client" className="client">
        {/* <h1>Welcome to your Client</h1> */}
        <SideBar />
        <Main />
        {/* {files.length > 0 && files.map((f, index) => 
            <Markdown onClick={() => {
                setEditorText(f.content)
                setFileIndex(index)
                }} 
                key={index} 
                className="client__fileTitle">{f.title}</Markdown>)}
        {files.length > 0 && <MdEditor 
            value={editorText}
            renderHTML={(text) => <Markdown >{text}</ Markdown>} 
            onChange={({ html, text }) => {
                setEditorText(text)
                setFiles(produce(files, draft => { draft[fileIndex].content = text }))
            }}/>} */}
    </div>
}

export default Client