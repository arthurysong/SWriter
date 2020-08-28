import React from 'react'
import './SideBar.scss';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import { useSelector } from 'react-redux';

function SideBar(props) {
  const files = useSelector(state => state.files);
  console.log('files', files);
  return <div className="sideBar">
    <div className="sideBar__email">arthursong14@gmail.com</div>
    <div className="sideBar__button">New Note</div>
    <div className="sideBar__notes">
      <div className="sideBar__group">
        <div className="sideBar__listItem --folder"><FolderOutlinedIcon />&nbsp;<span className="sideBar__title">Programming</span></div>
        <div className="sideBar__listItem --file"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Pt II Distributed Data</span></div>
        <div className="sideBar__listItem --file"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Random Number, Positive Infinity, and BNS</span></div>
      </div>
      <div className="sideBar__listItem"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Array from Range, Product of array except self</span></div>
      <div className="sideBar__listItem"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Ruby hashes are ordered. (LRU cache problem)</span></div>
      <div className="sideBar__listItem"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Longest Substring without Repeating Chars</span></div>
    </div>
  </div>
}

export default SideBar
