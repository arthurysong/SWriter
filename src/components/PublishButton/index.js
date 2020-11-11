import React, { useState } from 'react'
import './PublishButton.scss';
import { publishPost, setNoteContent } from '../../actions';
import PublishModal from './PublishModal';
import { useDispatch } from 'react-redux';

const PublishButton = ({ note, setShowPublishModal }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const clickHandler = () => {
        // if (!note.published) dispatch(publishPost(note))
        if (!note.published) {
            // start the dispatch
            // show the modal
            // console.log("cunt")
            // setShowModal(true);
            setShowPublishModal(true);
        }
    }

    return <div onClick={clickHandler} className={`publishButton ${note.published ? '--disabled' : '' }`}>
        {note.published ? "Published" : "Publish"}
        {/* <PublishModal show={showModal} modalClosed={() => setShowModal(false)} /> */}
    </div>
}

export default PublishButton
