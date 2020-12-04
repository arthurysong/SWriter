import React from 'react'
import { setNotePosition, setNoteContent, resetSaving } from '../../redux/actions';
import './Note.scss';
import { useDispatch, useSelector } from 'react-redux';

const Note = ({ note }) => {
    const dispatch = useDispatch();
    const notePosition = useSelector(state => state.notePosition);

    const clickHandler = () => {
        // Need note also because when note gets deleted we will have wrong notePosition
        if (localStorage.getItem("saved_content") && notePosition.notebook && notePosition.note && note ) {
            dispatch(setNoteContent(notePosition, localStorage.getItem("saved_content")));
            localStorage.removeItem("saved_content")
            dispatch(resetSaving());
        }
        dispatch(setNotePosition(note));
    }

    return <div 
        className={`note ${notePosition.notebook === note.notebook && notePosition.note === note._id ? 'note--active': '' }`} 
        onClick={clickHandler}>
        <i className="fas fa-file-alt" />&nbsp;
        {note.title}
    </div>
}

export default Note
