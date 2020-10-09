import React from 'react'
import './SideBar.scss';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import { useSelector, useDispatch } from 'react-redux';
// import { postNewNote } from '../../actions';
import { githubOauth } from '../../utils/github';
import Notebook from '../Notebook';

function SideBar() {
  // const files = useSelector(state => state.files);
  // const editorFileId = useSelector(state => state.editorFileId);
  const notebooks = useSelector(state => state.user.notebooks);
  // const entry = use
  const dispatch = useDispatch();


  // console.log("notebooks", notebooks);
  return <div className="sideBar">
    <div className="sideBar__user">
      <div className="sideBar__email">arthursong14@gmail.com</div>
      <i className="sideBar__carrot fa fa-caret-down" />
    </div>
    {/* <div className="sideBar__button" onClick={() => { dispatch(postNewNote()) }}>New Note</div> */}
    {/* <div className="sideBar__gitHubConnect" onClick={githubOauth}>Connect to GitHub</div> */}
    <div className="sideBar__button">New Note</div>
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
