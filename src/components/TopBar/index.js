import React, { useState, useEffect } from 'react'
import moment from 'moment';
import './TopBar.scss';
import { setNoteTitle, saveNote } from '../../actions'
import FileOptions from '../FileOptions';
import PublishButton from '../PublishButton';
import { useSelector } from 'react-redux';
import wedgesSpinner from '../../assets/images/wedges-spinner.gif';
import checkMark from '../../assets/images/check-mark.png';

const TopBar = ({ note, notePosition, dispatch }) => {
    const [titleChanged, setTitleChanged] = useState(false);
    const [dateString, setDateString] = useState('');
    const saveStatus = useSelector(state => state.saveStatus);

    const titleChange = e => {
        setTitleChanged(true);
        dispatch(setNoteTitle(notePosition, e.target.value))
    }

    const titleBlur = () => {
        if (titleChanged) dispatch(saveNote(note, { title: note?.title}));
        setTitleChanged(false);
    }

    useEffect(() => {
        // updates the dateString everytime the editor saves the note content
        const d = new Date(note.updatedAt);
        const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
        const hours = d.getHours().toString().length == 1 ? `0${d.getHours()}` : d.getHours();
        const minutes = d.getMinutes().toString().length == 1 ? `0${d.getMinutes()}` : d.getMinutes();
        setDateString(`Last edit was ${months[d.getMonth()]} ${d.getDate()} ${hours}:${minutes}`);
    }, [note.updatedAt]);

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
            {dateString}
        </div>

        <div className="topBar__saving">
            <img 
                className={`saving__icon 
                    ${saveStatus === "Saving" ? 'saving__icon--in' : null }
                    ${saveStatus === "Saved" ? 'saving__icon--out': null }`} 
                src={wedgesSpinner} 
                alt="saving icon" />
            {/* {saveStatus === "Saving" || saveStatus === "Saved" ? <img 
                className={`saving__icon ${saveStatus === "Saved" ? 'saving__icon--out' : '' }`} src={wedgesSpinner} alt="saving icon"
            /> : null} */}
            {/* // /> : saveStatus === "Saved" ? <img
            //     className="saving__icon" src={checkMark} alt="saved icon" 
            // /> : null} */}
        </div>

        <div className="topBar__buttons">
            <PublishButton note={note} notePosition={notePosition}/>
            <FileOptions />
        </div>
    </div>
}

export default TopBar
