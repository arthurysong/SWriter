import React, { useState, useRef } from 'react'
import './TopBar.scss';
import { setFileName, saveFileName } from '../actions'

const TopBar = ({ file, editorFileId, dispatch }) => {
    const [titleChanged, setTitleChanged] = useState(false);
    const [menuState, setMenuState] = useState(false);
    const dropdown = useRef(null);

    const titleChange = e => {
        setTitleChanged(true);
        dispatch(setFileName(editorFileId, e.target.value))
    }

    const titleBlur = () => {
        if (titleChanged) dispatch(saveFileName(editorFileId, file?.name));
        setTitleChanged(false);
    }

    const handleBlur = e => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setMenuState(false);
            }
        }, 0);
    };

    const toggleMenu = () => {
        console.log(menuState);
        setMenuState(menuState => !menuState);

        setTimeout(() => {
            dropdown.current.focus();
        }, 0)
    }

    return <div className="topBar">
        <div className="topBar__titleLabel">Title</div>
        <input 
            className="topBar__titleInput" 
            value={file?.name} 
            placeholder="Title goes here" 
            onChange={titleChange}
            onBlur={titleBlur}/>

        <div className="topBar__menuButton" onClick={toggleMenu}>
            <i className="fas fa-ellipsis-h"></i>
        </div>

        {/* {menuState && <div ref={dropdown} className="topBar__dropdown" tabIndex="1" onBlur={handleBlur}> */}
        {<div ref={dropdown} className={`topBar__dropdown ${menuState ? '--active' : ''}`} tabIndex="1" onBlur={handleBlur}>
                <div className="topBar__dropdownItem">Export</div>
                <div className="topBar__dropdownItem">Delete</div>
                <div className="topBar__dropdownItem">Print</div>
                {/* <div className="topBar__dropdownItem"></div> */}
            </div>}
    </div>
}

export default TopBar
