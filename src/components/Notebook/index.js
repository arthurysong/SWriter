import React, { useState } from 'react'
import './Notebook.scss';
import Note from '../Note';


const Notebook = ({ notebook }) => {
    const [clicked, setClicked] = useState(false);

    return <div className="notebook">
        <div onClick={() => setClicked(clicked => !clicked)} className="notebook__listItem">
            <i className={`notebook__carrot fa ${clicked ? 'fa-caret-down' : 'fa-caret-right' }`} />
            &nbsp;<i className="notebook__bookIcon fas fa-book" />
            &nbsp;<div className="notebook__title">{notebook.name}</div>
        </div>
        {clicked && notebook.notes.map((note, index) => <Note key={index} note={note}/>)}
    </div>
}

export default Notebook
