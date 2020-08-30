import React from 'react'
import './Main.scss';
import MdEditor from 'react-markdown-editor-lite';
import Markdown from 'markdown-to-jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setFileText } from '../actions';
import { debounce } from 'lodash';
import Editor from 'rich-markdown-editor';

const Main = () => {
    const files = useSelector(state => state.files);
    const dispatch = useDispatch();
    // this should grab the correct file and load it into the editor
    const content = useSelector(state => state.files[state.editorFileId]?.text);
    const editorFileId = useSelector(state => state.editorFileId);

    console.log(content)
    return <div className="main">
        <Editor value={content} autoFocus onChange={debounce(value => setFileText(editorFileId, value), 250)} />
        {/* <MdEditor 
        // onChange it should change the content of the file we are currently looking at...
            onChange={({ html, text }) => dispatch(setFileText(editorFileId, text))}
            value={content}
            renderHTML={(text) => <Markdown >{text}</ Markdown>}/> */}
        {/* {files.length > 0 && <MdEditor 
            value={editorText}
            renderHTML={(text) => <Markdown >{text}</ Markdown>} 
            onChange={({ html, text }) => {
                setEditorText(text)
                setFiles(produce(files, draft => { draft[fileIndex].content = text }))
            }}/>}  */}
        {/* <MdEditor 
            value={editorText}
            renderHTML={(text) => <Markdown >{text}</ Markdown>} 
            onChange={({ html, text }) => {
                setEditorText(text)
                setFiles(produce(files, draft => { draft[fileIndex].content = text }))
            }}/> */}
    </div>
}

export default Main
