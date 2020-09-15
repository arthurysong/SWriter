import React from 'react'
import { setNotePosition, setNoteContent } from '../../actions';
import './Note.scss';
import { useDispatch, useSelector } from 'react-redux';

const Note = ({ note, notebookIndex, noteIndex }) => {
    const dispatch = useDispatch();
    const notePosition = useSelector(state => state.notePosition);

    const clickHandler = () => {
        console.log("notePosition", notePosition);
        if (localStorage.getItem("saved_content") && notePosition.length) {
            console.log("notePosition", notePosition);
            console.log("localStorage saved_content", localStorage.getItem("saved_content"))
            dispatch(setNoteContent(notePosition, localStorage.getItem("saved_content")));

            localStorage.removeItem("saved_content")
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
