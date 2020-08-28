import React from 'react'
import './SideBar.scss';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

function SideBar(props) {
  return <div className="sideBar">
    <div className="sideBar__email">arthursong14@gmail.com</div>
    <div className="sideBar__button">New Note</div>
    <div className="sideBar__notes">
      <div className="sideBar__note"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Pt II Distributed Data</span></div>
      <div className="sideBar__note"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Random Number, Positive Infinity, and BNS</span></div>
      <div className="sideBar__note"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Array from Range, Product of array except self</span></div>
      <div className="sideBar__note"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Ruby hashes are ordered. (LRU cache problem)</span></div>
      <div className="sideBar__note"><InsertDriveFileOutlinedIcon />&nbsp;<span className="sideBar__title">Longest Substring without Repeating Chars</span></div>
    </div>
  </div>
}

export default SideBar
