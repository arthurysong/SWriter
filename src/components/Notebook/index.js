import React, { useEffect, useState, useRef } from 'react'
import './Notebook.scss';
import Note from '../Client/Note';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNotebook, deleteNotebook, setNotebookName, saveNotebook } from '../../redux/actions/index';
import OptionsModal from '../SideBar/OptionsModal';


const Notebook = ({ notebook, setShowDeleteModal }) => {
    const [toggled, setToggled] = useState(false);
    // const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch();
    const activeNotebook = useSelector(state => state.activeNotebook);
    const [showButtons, setShowButtons] = useState(false);
    const [editingName, setEditingName] = useState(false);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (activeNotebook === notebook._id) setToggled(true);
    }, [activeNotebook])

    const clickHandler = e => {
        e.stopPropagation(); // prevents the outer event from firing.
        setToggled(toggled => !toggled)
    }


    return <div onClick={() => dispatch(setActiveNotebook(notebook._id))} className="notebook">
        <div 
            onMouseEnter={() => {setShowButtons(true)}} 
            onMouseLeave={() => {setShowButtons(false)}}
            onClick={() => setToggled(true)} 
            className={`notebook__listItem ${activeNotebook === notebook._id ? 'notebook--active' : '' }`}>
            <i onClick={clickHandler}
                className={`notebook__carrot fa ${toggled ? 'fa-caret-down' : 'fa-caret-right' }`} />
            &nbsp;<i className="notebook__bookIcon fas fa-book" />&nbsp;
            {/* <input style={{width: "10px"}} ref={nameInput} /> */}
            &nbsp;{editingName ? <input 
                className="notebook__nameInput"
                type="text" 
                autoFocus
                value={notebook.name}
                onChange={e => {
                    dispatch(setNotebookName(e.target.value, activeNotebook))
                }}
                onBlur={() => {
                    // Save the notebook name
                    // setEditingName to false
                    setEditingName(false);
                    dispatch(saveNotebook(notebook, { name: notebook?.name }))
                }}
                /> : <div className="notebook__title">{notebook.name}</div>}

            <div className="notebook__buttons" style={{ display: showButtons && !editingName ? 'flex' : 'none' }}>
                <i 
                    className="far fa-edit"
                    onClick={e => {
                        e.stopPropagation();
                        dispatch(setActiveNotebook(notebook._id));
                        setEditingName(true);
                    }}></i>&nbsp;
                <i 
                    className="far fa-trash-alt"
                    onClick={e => {
                        e.stopPropagation();
                        dispatch(setActiveNotebook(notebook._id));
                        setShowDeleteModal(true)}}
                    ></i>
            </div>
        </div>
        
        {toggled && Object.values(notebook.notes).map((note, noteIndex) => <Note key={noteIndex} note={note} />)}
    </div>
}

export default Notebook
