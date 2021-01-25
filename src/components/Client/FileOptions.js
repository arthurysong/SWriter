import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { deleteNote } from '../../redux/actions';
import OptionsModal from '../SideBar/OptionsModal';
import useSelectActiveNote from '../../redux/selectors/useSelectActiveNote';

const StyledFileOptions = styled.div`
  .fileOptions__button {
    margin-right: 12px;
    padding: 0 6px;

    &:hover {
        cursor: pointer;
    }
  }
`;

const FileOptions = () => {
    const [noteOptions, setNoteOptions] = useState(false);
    const dispatch = useDispatch();
    const note = useSelectActiveNote();

    return <StyledFileOptions>
        <div className="fileOptions__button" onClick={() => setNoteOptions(true)}>
            <i className="fas fa-ellipsis-h"></i>
        </div>

        <OptionsModal noteOptions={noteOptions} show={noteOptions} modalClosed={() => setNoteOptions(false)}>
            <div className="modal__option modal__option--disabled">Share...</div>
            <div className="modal__option modal__option--disabled">Move...</div>
            <div className="modal__option modal__option--disabled">Copy to...</div>
            <div className="modal__option modal__option--disabled">Duplicate</div>
            <div className="modal__separator" />
            <div className="modal__option modal__option--disabled">Edit tags...</div>
            <div className="modal__option modal__option--disabled">Find within note...</div>
            <div className="modal__option modal__option--disabled">Note info</div>
            <div className="modal__separator" />
            <div className="modal__option modal__option--disabled">Print...</div>
            <div className="modal__option modal__option--delete" onClick={() => dispatch(deleteNote(note._id))}>Delete</div>
        </OptionsModal>
    </StyledFileOptions>
}

export default FileOptions
