import React from 'react'
import { setNotePosition } from '../../actions';
import './Note.scss';
import { useDispatch, useSelector } from 'react-redux';

const Note = ({ note, notebookIndex, noteIndex }) => {
    const dispatch = useDispatch();
    const notePosition = useSelector(state => state.notePosition);

    return <div 
        className={`note ${notePosition[0] === notebookIndex && notePosition[1] === noteIndex ? 'note--active': '' }`} 
        onClick={() => dispatch(setNotePosition(notebookIndex, noteIndex))}>
        <i className="fas fa-file-alt" />&nbsp;
        {note.title}
    </div>
}

export default Note
