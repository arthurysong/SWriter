import React, { useState } from 'react'
import './Notebook.scss';
import Note from '../Note';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNotebook } from '../../actions/index';


const Notebook = ({ notebook, notebookIndex }) => {
    // const [toggled, setToggled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch();
    const activeNotebook = useSelector(state => state.activeNotebook);

    return <div onClick={() => dispatch(setActiveNotebook(notebookIndex))} className="notebook">
        <div className={`notebook__listItem ${activeNotebook === notebookIndex ? 'notebook--active' : '' }`}>
            <i className={`notebook__carrot fa ${activeNotebook === notebookIndex ? 'fa-caret-down' : 'fa-caret-right' }`} />
            &nbsp;<i className="notebook__bookIcon fas fa-book" />
            &nbsp;<div className="notebook__title">{notebook.name}</div>
        </div>
        {activeNotebook === notebookIndex && notebook.notes.map((note, noteIndex) => <Note key={noteIndex} note={note} noteIndex={noteIndex} notebookIndex={notebookIndex}/>)}
    </div>
}

export default Notebook
