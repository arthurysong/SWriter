import React from 'react'
import MarkdownEditor from 'rich-markdown-editor';
import { debounce } from 'lodash'
import { saveNote } from '../../redux/actions';
import { PROD_API_URL } from '../../utils/URL';
import './Editor.scss';
import axios from 'axios';

const Editor = ({ note, notePosition, dispatch }) => {
    const changeHandler = debounce(value => {
        localStorage.setItem("saved_content", value());
        localStorage.setItem("last_saved_position", notePosition );
        dispatch(saveNote(note, { content: value() } ));
    }, 500)
    
    return <div className="editor"> {/* I need this outer div for styling reasons. */}
        <MarkdownEditor 
            className="editor__content" 
            placeholder="Write down something interesting..."
            key={note._id} 
            // Add a button that allows for dark mode?
            // dark={true}
            uploadImage={async file => {
                const form = new FormData();
                form.append("file", file, 'file');
                // Only use PROD_API_URL for images so that the Production server has all images
                const result = await axios.post(`${PROD_API_URL}/image`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                return `${PROD_API_URL}/${result.data.filename}`;
            }}
            autoFocus 
            defaultValue={note?.content} 
            value={note?.content} 
            onChange={changeHandler}
            onSave={() => console.log('test: saved')}/>
    </div>
}

export default Editor
