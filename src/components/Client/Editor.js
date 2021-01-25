import React from 'react'
import MarkdownEditor from 'rich-markdown-editor';
import { debounce } from 'lodash'
import styled from 'styled-components';
import axios from 'axios';

import { saveNote } from '../../redux/actions';
import { PROD_API_URL } from '../../utils/URL';

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  background-color: #e6e6e6;
`;

const StyledMarkdownEditor = styled(MarkdownEditor)`
  margin: 0 auto;
  padding: 24px 0;
  width: 816px;

  .ProseMirror {
    padding: 42px;
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
    font-family: ${props => props.theme.fontFamily.main};
  }
`;

const Editor = ({ note, dispatch }) => {
  const changeHandler = debounce(value => {
      localStorage.setItem("saved_content", value());
      // console.log('value', { value: value() });

      dispatch(saveNote(note, { content: value() } ));
  }, 500)
  
  return <Wrapper>
    <StyledMarkdownEditor
      placeholder="Write something interesting..."
      key={note._id} 
      // Add a button that allows for dark mode?
      // dark={true}
      uploadImage={async file => {
        // TODO: Use imgur to upload photos don't use our API to store images.
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
  </Wrapper>
}

export default Editor
