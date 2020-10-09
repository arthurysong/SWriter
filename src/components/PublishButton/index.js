import React from 'react'
import './PublishButton.scss';
import { publishPost, setNoteContent } from '../../actions';
import { useDispatch } from 'react-redux';

const PublishButton = ({ note, notePosition }) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        if (!note.published) dispatch(publishPost(note, notePosition))
    }

    return <div onClick={clickHandler} className={`publishButton ${note.published ? '--disabled' : '' }`}>
        {note.published ? "Published" : "Publish"}
    </div>
}

export default PublishButton
