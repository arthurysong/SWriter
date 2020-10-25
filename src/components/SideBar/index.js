import React, { useState } from 'react'
import './SideBar.scss';
import { useSelector, useDispatch } from 'react-redux';
// import Dropdown from 'react-dropdown';
import Notebook from '../Notebook';
import { newNote } from "../../actions"
import UserOptionsModal from './UserOptionsModal';

function SideBar() {
  const notebooks = useSelector(state => state.user.notebooks);
  const activeNotebook = useSelector(state => state.activeNotebook);
  const activeNotebookId = useSelector(state => state.user.notebooks[state.activeNotebook]);
  const { name, _id } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [userOptions, setUserOptions] = useState(false); // Used to toggle the options when User is clicked

  const onSelect = () => {
    console.log("hi");
  }

  // TODO: Fix this...
  // const options = [{ value: 'Arthur Song', className: 'dropdown__option' }, 
  //   { value: 'Settings', className: 'dropdown__option' }, { value: 'Help & Learn', className: 'dropdown__option' }, { value: "What's new in MWriter", className: 'dropdown__option' }, 
  //   { value: "Sign out Arthur Song", className: 'dropdown__option' }]
  // console.log("notebooks", notebooks);
  return <div className="sideBar">

    {/* <Dropdown className="dropdown" placeholder={<div className="sideBar__user"> */}
      {/* <div className="sideBar__email">{name}</div> */}
      {/* <i className="sideBar__carrot fa fa-caret-down" /> */}
    {/* </div>} onChange={onSelect} options={options} menuClassName="dropdown__menu" /> */}
    <div className="sideBar__user" onClick={() => setUserOptions(true)}>
      <div className="sideBar__email">{name}</div>
      <i className="sideBar__carrot fa fa-caret-down" />
    </div>

    <UserOptionsModal show={userOptions} modalClosed={() => setUserOptions(false)} >
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
      <div className="modal__option">Sign out {name}</div>
      <div className="modal__separator" />
      <div className="modal__option modal__option--disabled modal__option--version">MWriter Web v10.2.2</div>
    </UserOptionsModal>



    {/* <div className="sideBar__button" onClick={() => { dispatch(postNewNote()) }}>New Note</div> */}
    {/* <div className="sideBar__gitHubConnect" onClick={githubOauth}>Connect to GitHub</div> */}
    <div onClick={() => dispatch(newNote(activeNotebookId, _id, activeNotebook))} className="sideBar__button">New Note</div>
    <div className="sideBar__notes">
    {/* {Object.keys(files).length > 0 && Object.entries(files).map((f, index) => 
    // Here onClick should save the current content... 
      <div key={index} className={`sideBar__listItem ${f[0] === editorFileId ? '--active' : ''}`} onClick={() => clickHandler(f)}> 
        <InsertDriveFileOutlinedIcon />&nbsp;
        <span className="sideBar__title">{f[1].name}</span>
      </div>)} */}
      {/* {notebooks.map((nb, index) => <div key={index} onClick={expandNotebook} className="sideBar__listItem"><i className="sideBar__carrot fa fa-caret-right" />&nbsp;{nb.name}</div>)} */}
      {notebooks.map((nb, index) => <Notebook key={index} notebook={nb} notebookIndex={index} />)}
    </div>
  </div>
}

export default SideBar

   {/* <div className="sideBar__group">
        <div className="sideBar__listItem --folder"><FolderOutlinedIcon />&nbsp;<span className="sideBar__title">Programming</span></div>
        <div className="sideBar__listItem --file"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Pt II Distributed Data</span></div>
        <div className="sideBar__listItem --file"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Random Number, Positive Infinity, and BNS</span></div>
      </div>
      <div className="sideBar__listItem"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Array from Range, Product of array except self</span></div>
      <div className="sideBar__listItem"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Ruby hashes are ordered. (LRU cache problem)</span></div>
      <div className="sideBar__listItem"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Longest Substring without Repeating Chars</span></div> */}
