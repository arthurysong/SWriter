import React, { useEffect, useState } from 'react'
import './Notebook.scss';
import Note from '../Note';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNotebook } from '../../redux/actions/index';


const Notebook = ({ notebook, notebookIndex }) => {
    const [toggled, setToggled] = useState(false);
    // const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch();
    const activeNotebook = useSelector(state => state.activeNotebook);

    useEffect(() => {
        if (activeNotebook === notebookIndex) setToggled(true);
    }, [activeNotebook])

    const clickHandler = e => {
        e.stopPropagation(); // prevents the outer event from firing.
        setToggled(toggled => !toggled)
    }


    return <div onClick={() => dispatch(setActiveNotebook(notebook._id))} className="notebook">
        <div onClick={() => setToggled(true)} className={`notebook__listItem ${activeNotebook === notebook._id ? 'notebook--active' : '' }`}>
            <i onClick={clickHandler}
                className={`notebook__carrot fa ${toggled ? 'fa-caret-down' : 'fa-caret-right' }`} />
            &nbsp;<i className="notebook__bookIcon fas fa-book" />
            &nbsp;<div className="notebook__title">{notebook.name}</div>
        </div>
        {toggled && Object.values(notebook.notes).map((note, noteIndex) => <Note key={noteIndex} note={note} />)}
    </div>
}

export default Notebook
