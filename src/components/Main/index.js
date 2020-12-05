import React, { useEffect } from 'react'
import './Main.scss';
import { useSelector, useDispatch } from 'react-redux';
import useSelectActiveNote from '../../redux/selectors/useSelectActiveNote';
// import { setEditorFileId } from '../../actions';
import { setActiveNotebook, setNotePosition } from '../../redux/actions';
import TopBar from '../TopBar';
import Editor from '../Editor';

const Main = () => {
    const dispatch = useDispatch();
    const note = useSelectActiveNote();
    const notePosition = useSelector(state => state.notePosition);
    const user = useSelector(state => state.user);

    useEffect(() => {
        // if (localStorage.getItem("last_saved_position")) {
        //     const [position1, position2] = localStorage.getItem("last_saved_position").split(',').map(n => parseInt(n));
        //     if (user.notebooks[position1]?.notes[position2]) dispatch(setNotePosition(position1, position2)) // Should only set notebook position if there is a note there.
        //     // If note was deleted and also the last saved, need the if (note) condition

        //     dispatch(setActiveNotebook(position1));
        // }
        
    }, []);

    if (note) return <div className="main">
        <TopBar note={note} notePosition={notePosition} dispatch={dispatch}/>
        <Editor note={note} notePosition={notePosition} dispatch={dispatch}/>
    </div>

    return <div className="main">
        <div className="main__placeHolder">Hmm, it's very empty here...</div>
    </div>
}

export default Main
