// import React from 'react'
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 0 36px;
  height: 48px;
  background-color: ${props => props.disabled ? props.theme.disabled.main : props.theme.primary.main};
  background-color: ${props => props.black ? "#000" : props.theme.primary.main};
  border-radius: 24px;
  border: none;
  font-family: ${props => props.theme.fontFamily.main};

  color: #fff;
  font-size: 14px;
  font-weight: 400;

  p {
    // position: relative;
    // top: 50%;
    // transform: translate(0, -50%);
  }


  &:hover {
    cursor: pointer;
    background-color: ${props => props.black ? "#000" : props.theme.primary.dark };
    color: ${props => props.black ? props.theme.primary.main : 'white'}
  }
`;

export default Button;
