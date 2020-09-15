import React, { useEffect } from 'react'
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setEditorFileId } from '../../actions';
import TopBar from '../TopBar';
import Editor from '../Editor';

const Main = () => {
    const dispatch = useDispatch();
    // const file = useSelector(state => state.files[state.editorFileId]);
    const note = useSelector(state => state.user.notebooks[state.notePosition[0]]?.notes[state.notePosition[1]]);
    // const editorFileId = useSelector(state => state.editorFileId);

    console.log("note", note);
    useEffect(() => {
        // if (localStorage.getItem("last_saved_id", editorFileId)) dispatch(setEditorFileId(localStorage.getItem("last_saved_id"))) 
    }, []);


    if (note) return <div className="main">
        <TopBar note={note} dispatch={dispatch}/>
        <Editor note={note} dispatch={dispatch}/>
    </div>

    return <div className="main">
        <div className="main__placeHolder">Hmm, it's very empty here...</div>
    </div>
}

export default Main
