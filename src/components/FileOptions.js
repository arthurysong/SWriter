import React, { useState, useRef } from 'react'
import './FileOptions.scss';

const FileOptions = () => {
    const [menuState, setMenuState] = useState(false);
    const dropdown = useRef(null);

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
            <div className="fileOptions__dropdownItem">Delete</div>
            <div className="fileOptions__dropdownItem">Print</div>
        </div>
    </div>
}

export default FileOptions
