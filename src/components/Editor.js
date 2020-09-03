import React from 'react'
import MarkdownEditor from 'rich-markdown-editor';
import { debounce } from 'lodash'
import { saveFileContent } from '../actions'
import './Editor.scss';

const Editor = ({ file, editorFileId, dispatch }) => {
    const changeHandler = debounce(value => {
        localStorage.setItem("saved_content", value());
        localStorage.setItem("last_saved_id", editorFileId);
        dispatch(saveFileContent(editorFileId, value()))
    }, 250)

    return <div className="editor"> {/* I need this outer div for styling reasons. */}
        <MarkdownEditor className="editor__content" key={editorFileId} autoFocus defaultValue={file?.text} value={file?.text} onChange={changeHandler}/>
    </div>
}

export default Editor
