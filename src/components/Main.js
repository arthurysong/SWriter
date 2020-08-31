import React, { useEffect } from 'react'
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setFileText, saveFile } from '../actions';
import { debounce } from 'lodash'
import Editor from 'rich-markdown-editor';

const Main = () => {
    // const files = useSelector(state => state.files);
    // const [editor, setEditor] = useState("");
    const dispatch = useDispatch();
    const content = useSelector(state => state.files[state.editorFileId]?.text);
    const editorFileId = useSelector(state => state.editorFileId);

    const changeHandler = debounce(value => {
        localStorage.setItem("saved", value());
        console.log('save to google drive');
        dispatch(saveFile(value()))
        // save in google drive.
    }, 250)

    // When the editorFileId changes, we should update the file in our redux store.
    // Also, when component unmounts we need to save to google drive.
    // console.log('content', content)
    return <div className="main">
        {/* {content && <Editor value={content} onChange={changeHandler} />} */}
        {content && <Editor defaultValue={content} value={content} onChange={changeHandler}/>}
    </div>
}

export default Main
