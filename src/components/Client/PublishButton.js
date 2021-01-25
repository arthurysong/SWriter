import React from 'react'
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';

const StyledPublishButton = styled.div`
  display: inline-block;
  background-color: ${props => props.disabled ? props.theme.disabled.main : props.theme.primary.main};
  border-radius: 6px;
  padding: 6px;
  color: #fff;
  margin-right: 10px;
  font-size: 12px;

  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.theme.primary.dark};
  }
`;


const PublishButton = ({ note, setShowPublishModal }) => {
    // const dispatch = useDispatch();
    // const [showModal, setShowModal] = useState(false);
    const clickHandler = () => {
        if (!note.published) {
            setShowPublishModal(true);
        }
    }

    return <StyledPublishButton onClick={clickHandler} disabled={note.published}>
      {note.published ? "Published" : "Publish"}
    </StyledPublishButton>

}

export default PublishButton
