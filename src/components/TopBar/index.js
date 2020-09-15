import React, { useState } from 'react'
import './TopBar.scss';
import { setNoteTitle, saveNote } from '../../actions'
import FileOptions from '../FileOptions';

const TopBar = ({ note, notePosition, dispatch }) => {
    const [titleChanged, setTitleChanged] = useState(false);

    const titleChange = e => {
        setTitleChanged(true);
        dispatch(setNoteTitle(notePosition, e.target.value))
    }

    const titleBlur = () => {
        if (titleChanged) dispatch(saveNote(note, { title: note?.title}));
        setTitleChanged(false);
    }

    return <div className="topBar">
        <div className="topBar__titleLabel">Title</div>
        <input 
            className="topBar__titleInput" 
            value={note?.title} 
            placeholder="Title goes here" 
            onChange={titleChange}
            onBlur={titleBlur}/>

        <FileOptions />
    </div>
}

export default TopBar
