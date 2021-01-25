import React from 'react'
import styled from 'styled-components';

import { setNotePosition, setNoteContent, resetSaving } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const StyledNote = styled.div`
  display: block;
  align-items: center;
  font-size: 12px;
  padding: 4px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${props => props.active && "#6e6e6e"};
  font-weight: ${props => props.active && 600};

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
`;

const Note = ({ note }) => {
    const dispatch = useDispatch();
    const notePosition = useSelector(state => state.notePosition);

    const clickHandler = () => {
        // Need note also because when note gets deleted we will have wrong notePosition
        if (localStorage.getItem("saved_content") && notePosition.notebook && notePosition.note && note ) {
            dispatch(setNoteContent(notePosition, localStorage.getItem("saved_content")));
            localStorage.removeItem("saved_content")
            dispatch(resetSaving());
        }
        dispatch(setNotePosition(note));
    }

    return <StyledNote 
        active={notePosition.notebook === note.notebook && notePosition.note === note._id}
        onClick={clickHandler}>
      <i className="fas fa-file-alt" />&nbsp;&nbsp;
      {note.title}
    </StyledNote>
}

export default Note
