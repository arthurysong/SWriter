import React, { useState } from 'react'
import './TopBar.scss';
import { setNoteTitle, saveNote } from '../../actions'
import FileOptions from '../FileOptions';
import PublishButton from '../PublishButton';

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

    const renderDate = () => {
        const d = new Date(note.updatedAt);
        const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
        return `Last edit was ${months[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    }

    return <div className="topBar">
        <div className="topBar__title">
            <div className="topBar__titleLabel">Title</div>
            <input 
                className="topBar__titleInput" 
                value={note?.title} 
                placeholder="Title goes here" 
                onFocus={e => e.target.select()}
                onChange={titleChange}
                onBlur={titleBlur}/>
        </div>

        <div className="topBar__edit">
            {renderDate()}
            {/* {renderDate()} */}
            {/* {Date.parse(note.createdAt)} */}
        </div>

        <div className="topBar__buttons">
            <PublishButton note={note} notePosition={notePosition}/>
            <FileOptions />
        </div>
    </div>
}

export default TopBar
