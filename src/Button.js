// import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  background-color: ${props => props.disabled ? props.theme.disabled.main : props.theme.primary.main};
  border-radius: 4px;
  padding: 7px 16px 9px;
  border: none;
  font-family: ${props => props.theme.fontFamily.main};

  color: #fff;
  font-size: 14px;
  font-weight: 400;


  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.primary.dark};
  }
`;

export default Button;
