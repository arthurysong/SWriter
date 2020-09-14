import React from 'react'
import './Note.scss';

const Note = ({ note }) => {
    return <div className="note">
        <i class="fas fa-file-alt" />&nbsp;
        {note.title}
    </div>
}

export default Note
