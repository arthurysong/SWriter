import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { setNoteTitle, saveNote } from '../../redux/actions'
import FileOptions from './FileOptions';
import PublishButton from './PublishButton';
import PublishModal from './PublishModal';
import wedgesSpinner from '../../assets/images/wedges-spinner.gif';

const StyledTopBar = styled.div`
  padding-left: 24px;
  border-bottom: 1px solid #ddd;
  height: 70px;
  position: relative;
  background-color: white;

  .topBar__title {
      display: inline-block;

      .topBar__titleLabel {
          line-height: 2em;
          display: block;
          
          font-family: 'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace;
          font-size: 13px;
          color: #4E5C6E;
      }

      .topBar__titleInput {
          border: none;
          font-family: ${props => props.theme.fontFamily.main};
          font-weight: 400;
          font-size: 18px;
          border-radius: 5px;
          padding: 4px 8px;
          border: 1px solid #fff;

          &:hover {
              border: 1px solid #e9e9e9;
          }

          &:focus {
              border: 1px solid #e7e7e7;
              outline: none;
          }
      }
  }

  .topBar__edit {
      display: inline-block;
      text-decoration: underline;
      margin-left: 12px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, .7);
  }

  .topBar__saving {
      margin-left: 8px;
      display: inline-block;

      .saving__icon {
          opacity: 0;
          vertical-align: bottom;
          width: 30px;

          transition: opacity 0.15s ease-in;

          &--in {
              opacity: 1;

              transition: opacity ease-out 0.10;
          }
      }
  }

  .topBar__buttons {
      float: right;
      display: flex;
      align-items: center;
      position: relative;
      top: 20px;
  }
`;

const TopBar = ({ note, notePosition, dispatch }) => {
  const [titleChanged, setTitleChanged] = useState(false);
  const [dateString, setDateString] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);

  // if current number of saving is greater than current number
  const savingStatus = useSelector(state => state.savingNumber > state.savedNumber);

  const titleChange = e => {
    setTitleChanged(true);
    dispatch(setNoteTitle(notePosition, e.target.value))
  }

  const titleBlur = () => {
    if (titleChanged) dispatch(saveNote(note, { title: note?.title }));
    setTitleChanged(false);
  }

  useEffect(() => {
    // updates the dateString everytime the editor saves the note content
    const d = new Date(note.updatedAt);
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const hours = d.getHours().toString().length == 1 ? `0${d.getHours()}` : d.getHours();
    const minutes = d.getMinutes().toString().length == 1 ? `0${d.getMinutes()}` : d.getMinutes();
    setDateString(`Last edit was ${months[d.getMonth()]} ${d.getDate()} ${hours}:${minutes}`);
  }, [note.updatedAt]);

  return <StyledTopBar>
    <div className="topBar__title">
      <label className="topBar__titleLabel">Title</label>
      <input
        className="topBar__titleInput"
        value={note?.title}
        placeholder="Title goes here"
        onFocus={e => e.target.select()}
        onChange={titleChange}
        onBlur={titleBlur} />
    </div>

    <div className="topBar__edit">
      {dateString}
    </div>

    <div className="topBar__saving">
      <img
        className={`saving__icon 
                ${savingStatus ? 'saving__icon--in' : ''}`}
        src={wedgesSpinner}
        alt="saving icon" />
    </div>

    <div className="topBar__buttons">
      <PublishButton note={note} setShowPublishModal={setShowPublishModal} />
      <PublishModal note={note} show={showPublishModal} modalClosed={() => setShowPublishModal(false)} />
      <FileOptions />
    </div>
  </StyledTopBar>
}

export default TopBar
