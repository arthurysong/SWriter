import React, { useState, useRef } from 'react'
import './FileOptions.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote } from '../../actions';

const FileOptions = () => {
    const [menuState, setMenuState] = useState(false);
    const dropdown = useRef(null);
    const dispatch = useDispatch();
    const noteId = useSelector(state => state.user.notebooks[state.notePosition[0]].notes[state.notePosition[1]]._id);

    const handleBlur = e => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setMenuState(false);
            }
        }, 0);
    };

    const toggleMenu = () => {
        setMenuState(menuState => !menuState);

        setTimeout(() => {
            dropdown.current.focus();
        }, 0)
    }

    // console.log("noteId", noteId);
    return <div className="fileOptions" ref={dropdown} tabIndex="1" onBlur={handleBlur}>
        <div className="fileOptions__button" onClick={toggleMenu}>
            <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className={`fileOptions__dropdown ${menuState ? '--active' : ''}`} >
            <div className="fileOptions__dropdownItem">Export</div>
            <div className="fileOptions__dropdownItem" onClick={() => dispatch(deleteNote(noteId))}>Delete</div>
            <div className="fileOptions__dropdownItem">Print</div>
        </div>
    </div>
}

export default FileOptions
