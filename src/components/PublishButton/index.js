import React from 'react'
import './PublishButton.scss';

const PublishButton = ({ note }) => {
    return <div className={`publishButton`} disabled={note.published}>
        {note.published ? "Published" : "Publish"}
    </div>
}

export default PublishButton
