import React, { useState, useRef } from 'react'
import './FileOptions.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFile } from '../../actions';

const FileOptions = () => {
    const [menuState, setMenuState] = useState(false);
    const dropdown = useRef(null);
    const dispatch = useDispatch();
    const editorFileId = useSelector(state => state.editorFileId);

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

    return <div className="fileOptions" ref={dropdown} tabIndex="1" onBlur={handleBlur}>
        <div className="fileOptions__button" onClick={toggleMenu}>
            <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className={`fileOptions__dropdown ${menuState ? '--active' : ''}`} >
            <div className="fileOptions__dropdownItem">Export</div>
            <div className="fileOptions__dropdownItem" onClick={() => dispatch(deleteFile(editorFileId))}>Delete</div>
            <div className="fileOptions__dropdownItem">Print</div>
        </div>
    </div>
}

export default FileOptions
