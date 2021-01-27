import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import useSelectActiveNote from '../../redux/selectors/useSelectActiveNote';
// import TopBar from '../TopBar';
import TopBar from './TopBar';
import Editor from './Editor';

const Wrapper = styled.div`
  height: 100vh;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #e7e7e7;

  .main__placeholder {
    color: rgba(24, 54, 14, 0.4);
    text-align: center;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }
}
`;

const Main = () => {
    const dispatch = useDispatch();
    const note = useSelectActiveNote();
    const notePosition = useSelector(state => state.notePosition);

    if (note) return <Wrapper>
      <TopBar note={note} notePosition={notePosition} dispatch={dispatch}/>
      <Editor note={note} notePosition={notePosition} dispatch={dispatch}/>
    </Wrapper>

    return <Wrapper>
      <div className="main__placeholder">Hmm, it's very empty here...</div>
    </Wrapper>
}

export default Main
