import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Notebook from './Notebook';
import { newNote, logout, newNotebook, deleteNotebook } from "../../redux/actions"
import OptionsModal from './OptionsModal';

const StyledSideBar = styled.div`
  height: 100%;
  width: 225px;
  background-color: #2e2e2e;
  color: white;

  .sideBar__user {
      margin: 24px 12px;
      opacity: .5;
      display: flex;
      justify-content: center;
      
      .sideBar__email {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block
      }

      .sideBar__carrot {
          margin-left: 14px;
      }

      &:hover {
          opacity: .8;
          cursor: pointer;
      }
  }

  .sideBar__button {
      background-color: #3aa82d;
      border-radius: 14px;
      padding: 8px;
      text-align: center;
      margin: 6px 18px 0px;

      &:hover {
          cursor: pointer;
          background-color: #308e26;
      }
  }

  

  .sideBar__notes {
      margin-top: 24px;

      .sideBar__newNotebookButton {
          align-items: center;
          font-size: 12px;
          padding: 4px 10px;

          &:hover{
              cursor: pointer;
              color: rgb(204, 204, 204);
          }
      }
      opacity: 0.9;
  }
`;

function SideBar() {
  const notebooks = useSelector(state => Object.values(state.user.notebooks));
  const activeNotebook = useSelector(state => state.activeNotebook);
  const activeNotebookId = useSelector(state => state.user.notebooks[state.activeNotebook]);
  const { name, _id } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [userOptions, setUserOptions] = useState(false); // Used to toggle the options when User is clicked

  return <StyledSideBar>
    {/* TODO: Maintain version number here ... */}
    {/* 1.3.0 */}

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
      <div className="modal__option modal__option--disabled modal__option--version">MWriter Web v1.3.0</div>
    </OptionsModal>

    <div onClick={() => dispatch(newNote(activeNotebookId, _id, activeNotebook))} className="sideBar__button">New Note</div>
    <div className="sideBar__notes">
      <div className="sideBar__newNotebookButton" onClick={() => dispatch(newNotebook(_id))}>+ Add Notebook</div>
      {notebooks.map((nb, index) => <Notebook key={index} notebook={nb} notebookIndex={index} setShowDeleteModal={setShowDeleteModal} />)}
    </div>

    <OptionsModal 
        backdropDark
        show={showDeleteModal} 
        deleteModal
        modalClosed={() => setShowDeleteModal(false)} >
      <h3>Delete Notebook</h3>
      <p className="deleteModal__rusure">Are you sure you want to delete this notebook?</p>
      <div className="deleteModal__buttons">
        <div 
          className="deleteModal__button deleteModal__button--red" 
          onClick={() => {
          dispatch(deleteNotebook());
          setShowDeleteModal(false);
        }}>Delete</div>
        <div 
          className="deleteModal__button"
          onClick={() => setShowDeleteModal(false)}>Cancel</div>
      </div>
    </OptionsModal>
  </StyledSideBar>
}

export default SideBar