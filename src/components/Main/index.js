import React, { useEffect } from 'react'
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
// import { setEditorFileId } from '../../actions';
import { setActiveNotebook, setNotePosition } from '../../actions';
import TopBar from '../TopBar';
import Editor from '../Editor';

const Main = () => {
    const dispatch = useDispatch();
    // const file = useSelector(state => state.files[state.editorFileId]);
    const note = useSelector(state => state.user.notebooks[state.notePosition[0]]?.notes[state.notePosition[1]]);
    const notePosition = useSelector(state => state.notePosition);
    // const user = useSelector(state => state.user);
    // const editorFileId = useSelector(state => state.editorFileId);

    // console.log("note", note);
    useEffect(() => {
        // if (localStorage.getItem("last_saved_id", editorFileId)) dispatch(setEditorFileId(localStorage.getItem("last_saved_id"))) 
        if (localStorage.getItem("last_saved_position")) {
            const [notebookPosition, notePosition] = localStorage.getItem("last_saved_position").split(',').map(n => parseInt(n));
            // console.log(localStorage.getItem("last_saved_position").split(',')[0])
            if (note) dispatch(setNotePosition(notebookPosition, notePosition)) // Should only set notebook position if there is a note there.
            // If note was deleted and also the last saved, need the if (note) condition
            
            dispatch(setActiveNotebook(notebookPosition));
        }
        
    }, []);


    // console.log("note", note);
    if (note) return <div className="main">
        <TopBar note={note} notePosition={notePosition} dispatch={dispatch}/>
        <Editor note={note} notePosition={notePosition} dispatch={dispatch}/>
    </div>

    return <div className="main">
        <div className="main__placeHolder">Hmm, it's very empty here...</div>
    </div>
}

export default Main
