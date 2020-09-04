import React, { useState } from 'react'
import './TopBar.scss';
import { setFileName, saveFileName } from '../actions'
import FileOptions from './FileOptions';

const TopBar = ({ file, editorFileId, dispatch }) => {
    const [titleChanged, setTitleChanged] = useState(false);

    const titleChange = e => {
        setTitleChanged(true);
        dispatch(setFileName(editorFileId, e.target.value))
    }

    const titleBlur = () => {
        if (titleChanged) dispatch(saveFileName(editorFileId, file?.name));
        setTitleChanged(false);
    }

    return <div className="topBar">
        <div className="topBar__titleLabel">Title</div>
        <input 
            className="topBar__titleInput" 
            value={file?.name} 
            placeholder="Title goes here" 
            onChange={titleChange}
            onBlur={titleBlur}/>

        <FileOptions />
    </div>
}

export default TopBar
