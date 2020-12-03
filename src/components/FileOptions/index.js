import React, { useState, useRef } from 'react'
import './FileOptions.scss';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../redux/actions';
import OptionsModal from '../SideBar/OptionsModal';
import useSelectActiveNote from '../../redux/selectors/useSelectActiveNote';

const FileOptions = () => {
    const [noteOptions, setNoteOptions] = useState(false);
    const dispatch = useDispatch();
    const note = useSelectActiveNote();

    return <div className="fileOptions">
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
    </div>
}

export default FileOptions
