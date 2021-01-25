import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Note from '../Client/Note';
import { setActiveNotebook, deleteNotebook, setNotebookName, saveNotebook } from '../../redux/actions/index';

const StyledNotebook = styled.div`
    .notebook__listItem {
        display: flex;
        align-items: center;
        font-size: 12px;
        // margin-top: 10px;
        padding: 4px 10px;
        background-color: ${props => props.active && "#4e4e4e"};
        font-weight: ${props => props.active && 550};

        .notebook__carrot {
            margin-left: 4px;
            width: 6px;
        }
    
        .notebook__bookIcon {
            margin-left: 8px;
        }
    
        .notebook__title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
    
        }

        .notebook__nameInput {
            border: none;
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;
            font-size: 12px;
            width: 100px;
            width: 90%;

            &:hover {
                border: 1px solid #e9e9e9;
            }
    
            &:focus {
                border: 1px solid #e7e7e7;
                outline: none;
            }
        }
    
        svg {
            font-size: 1.5em;
        }
    
        &:hover {
            cursor: pointer;
            background-color: #4e4e4e;
        }
    
        &:active {
            background-color: #6e6e6e;
        }
        .notebook__buttons {
            // float: right;
            display: flex;
            // display: none;
            justify-self: flex-end;
            margin-left: auto;
    
            .far.fa-edit{
                &:hover {
                    color: rgb(184, 184, 184);
                }
            }
    
            .far.fa-trash-alt{
                &:hover {
                    color: rgb(230, 119, 119);
                }
            }
        }
    }
`;

const Notebook = ({ notebook, setShowDeleteModal }) => {
    const [toggled, setToggled] = useState(false);
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


    return <StyledNotebook onClick={() => dispatch(setActiveNotebook(notebook._id))}>
        <div 
            onMouseEnter={() => {setShowButtons(true)}} 
            onMouseLeave={() => {setShowButtons(false)}}
            onClick={() => setToggled(true)} 
            active={activeNotebook === notebook._id}
            className="notebook__listItem">
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
    </StyledNotebook>
}

export default Notebook
