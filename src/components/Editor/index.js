import React from 'react'
import MarkdownEditor from 'rich-markdown-editor';
import { debounce } from 'lodash'
import { saveNote } from '../../actions'
import './Editor.scss';

const Editor = ({ note, notePosition, dispatch }) => {
    const changeHandler = debounce(value => {
        localStorage.setItem("saved_content", value());
        // localStorage.setItem("last_saved_id", note._id);
        localStorage.setItem("last_saved_position", notePosition );
        dispatch(saveNote(note, { content: value() }));
    }, 250)
    
    return <div className="editor"> {/* I need this outer div for styling reasons. */}
        <MarkdownEditor 
        className="editor__content" 
        placeholder="Write down something interesting..."
        key={note._id} 
        // dark={true}
        autoFocus 
        defaultValue={note?.content} 
        value={note?.content} 
        onChange={changeHandler}
        onSave={() => console.log('test: saved')}/>
    </div>
}

export default Editor
