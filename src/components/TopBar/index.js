import React, { useState, useEffect } from 'react'
import './TopBar.scss';
import { setNoteTitle, saveNote } from '../../actions'
import FileOptions from '../FileOptions';
import PublishButton from '../PublishButton';
import { useSelector } from 'react-redux';
import wedgesSpinner from '../../assets/images/wedges-spinner.gif';

const TopBar = ({ note, notePosition, dispatch }) => {
    const [titleChanged, setTitleChanged] = useState(false);
    const [dateString, setDateString] = useState('');
    const { savingNumber, savedNumber } = useSelector(state => state);
    // if current number of saving is greater than current number
    const savingStatus = useSelector(state => state.savingNumber > state.savedNumber);

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
        {console.log("savingStatus", savingStatus)}
        {console.log("savingNumber", savingNumber)}
        {console.log("savedNumber", savedNumber)}
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
                    ${savingStatus ? 'saving__icon--in' : 'saving__icon--out' }`}
                src={wedgesSpinner} 
                alt="saving icon" />
        </div>

        <div className="topBar__buttons">
            <PublishButton note={note}/>
            <FileOptions />
        </div>
    </div>
}

export default TopBar
