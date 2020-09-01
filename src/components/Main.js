import React, { useState, useEffect } from 'react'
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
import {  setFileName, saveFileContent, saveFileName, fetchFiles, setEditorFileId } from '../actions';
import { debounce } from 'lodash'
import Editor from 'rich-markdown-editor';

const Main = () => {
    const dispatch = useDispatch();
    const file = useSelector(state => state.files[state.editorFileId]);
    const editorFileId = useSelector(state => state.editorFileId);
    const [titleChanged, setTitleChanged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("last_saved_id", editorFileId)) dispatch(setEditorFileId(localStorage.getItem("last_saved_id"))) 
    }, []);

    const changeHandler = debounce(value => {
        localStorage.setItem("saved_content", value());
        localStorage.setItem("last_saved_id", editorFileId)
        console.log('save to google drive');
        dispatch(saveFileContent(editorFileId, value()))
    }, 250)

    // these two functions needed so we don't request if title hasn't been changed.
    const titleChange = e => {
        setTitleChanged(true);
        dispatch(setFileName(editorFileId, e.target.value))
    }

    const titleBlur = () => {
        if (titleChanged) dispatch(saveFileName(editorFileId, file.name));
        setTitleChanged(false);
    }

    return <div className="main">
            {file && <div className="main__title"><div className="main__label">Title</div>
                <input 
                    className="main__titleInput" 
                    value={file.name} 
                    placeholder="Title goes here" 
                    onChange={titleChange}
                    onBlur={titleBlur}/>
                    
            </div>}
            <div className="main__contentContainer">
                {console.log('text', file?.text)}
                {file && <Editor className="main__content" value={file.text} onChange={changeHandler}/>}
                {/* {file && <Editor className="main__content" value={""} onChange={changeHandler}/>} */}
            </div>
    </div>
}

export default Main
