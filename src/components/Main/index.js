import React, { useEffect } from 'react'
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setEditorFileId } from '../../actions';
import TopBar from '../TopBar';
import Editor from '../Editor';

const Main = () => {
    const dispatch = useDispatch();
    // const file = useSelector(state => state.files[state.editorFileId]);
    const editorFileId = useSelector(state => state.editorFileId);

    useEffect(() => {
        if (localStorage.getItem("last_saved_id", editorFileId)) dispatch(setEditorFileId(localStorage.getItem("last_saved_id"))) 
    }, []);

    // if (file) return <div className="main">
    //     <TopBar file={file} editorFileId={editorFileId} dispatch={dispatch}/>
    //     <Editor file={file} editorFileId={editorFileId} dispatch={dispatch}/>
    // </div>

    return <div className="main">
        <div className="main__placeHolder">Hmm, it's very empty here...</div>
    </div>
}

export default Main
