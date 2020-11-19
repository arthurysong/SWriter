import React from 'react'
import { setNotePosition, setNoteContent, resetSaving } from '../../redux/actions';
import './Note.scss';
import { useDispatch, useSelector } from 'react-redux';

const Note = ({ note, notebookIndex, noteIndex }) => {
    const dispatch = useDispatch();
    const notePosition = useSelector(state => state.notePosition);

    const clickHandler = () => {
        // Need note also because when note gets deleted we will have wrong notePosition
        if (localStorage.getItem("saved_content") && notePosition.length && note ) {
            console.log('notePosition', notePosition);
            dispatch(setNoteContent(notePosition, localStorage.getItem("saved_content")));
            localStorage.removeItem("saved_content")
            dispatch(resetSaving());
        }
        dispatch(setNotePosition(notebookIndex, noteIndex))
    }

    return <div 
        className={`note ${notePosition[0] === notebookIndex && notePosition[1] === noteIndex ? 'note--active': '' }`} 
        onClick={clickHandler}>
        <i className="fas fa-file-alt" />&nbsp;
        {note.title}
    </div>
}

export default Note
