import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Notebook from '../Notebook';
import { newNote } from "../../actions"
import UserOptionsModal from './UserOptionsModal';
import './SideBar.scss';

function SideBar() {
  const notebooks = useSelector(state => state.user.notebooks);
  const activeNotebook = useSelector(state => state.activeNotebook);
  const activeNotebookId = useSelector(state => state.user.notebooks[state.activeNotebook]);
  const { name, _id } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [userOptions, setUserOptions] = useState(false); // Used to toggle the options when User is clicked

  return <div className="sideBar">

    <div className="sideBar__user" onClick={() => setUserOptions(true)}>
      <div className="sideBar__email">{name}</div>
      <i className="sideBar__carrot fa fa-caret-down" />
    </div>

    <UserOptionsModal show={userOptions} modalClosed={() => setUserOptions(false)} name={name} />

    <div onClick={() => dispatch(newNote(activeNotebookId, _id, activeNotebook))} className="sideBar__button">New Note</div>
    <div className="sideBar__notes">
      {notebooks.map((nb, index) => <Notebook key={index} notebook={nb} notebookIndex={index} />)}
    </div>
  </div>
}

export default SideBar