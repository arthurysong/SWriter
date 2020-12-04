import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Notebook from '../Notebook';
import { newNote, logout, newNotebook } from "../../redux/actions"
import OptionsModal from './OptionsModal';

import './SideBar.scss';

function SideBar() {
  const notebooks = useSelector(state => Object.values(state.user.notebooks));
  const activeNotebook = useSelector(state => state.activeNotebook);
  const activeNotebookId = useSelector(state => state.user.notebooks[state.activeNotebook]);
  const { name, _id } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [userOptions, setUserOptions] = useState(false); // Used to toggle the options when User is clicked

  return <div className="sideBar">
    {/* TODO: Maintain version number here ... */}
    {/* 1.2.0 */}

    <div className="sideBar__user" onClick={() => setUserOptions(true)}>
      <div className="sideBar__email">{name}</div>
      <i className="sideBar__carrot fa fa-caret-down" />
    </div>

    {/* Modal that shows when Name is clicked */}
    <OptionsModal show={userOptions} modalClosed={() => setUserOptions(false)}>
      <div className="modal__header">Account</div>
      <div className="modal__acount">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="modal__checkmark"><path d="M17.572 6.35a1.013 1.013 0 011.531 1.325l-8.212 9.488a1.013 1.013 0 01-1.532 0L5.497 12.7a1.012 1.012 0 111.531-1.325l3.097 3.578 7.447-8.603z" fill="currentColor"></path></svg>
          <div className="modal__accountName">{name}</div>
      </div>
      <div className="modal__separator" />
      <div className="modal__option">Settings</div>
      <div className="modal__option modal__option--disabled">Help & Learning</div>
      <div className="modal__option modal__option--disabled">What's new in MWriter</div>
      <div className="modal__separator" />
      <div className="modal__option" onClick={() => dispatch(logout(history))}>Sign out {name}</div>
      <div className="modal__separator" />
      <div className="modal__option modal__option--disabled modal__option--version">MWriter Web v1.2.0</div>
    </OptionsModal>

    <div onClick={() => dispatch(newNote(activeNotebookId, _id, activeNotebook))} className="sideBar__button">New Note</div>
    <div className="sideBar__notes">
      <div className="sideBar__newNotebookButton" onClick={() => dispatch(newNotebook(_id))}>+ Add Notebook</div>
      {notebooks.map((nb, index) => <Notebook key={index} notebook={nb} notebookIndex={index} />)}
    </div>
  </div>
}

export default SideBar