// import React from 'react'
import styled from 'styled-components';

const Button = styled.div`
  display: inline-block;
  // display: flex;
  // align-items: center;
  // line-height: 30px;
  background-color: ${props => props.disabled ? props.theme.disabled.main : props.theme.primary.main};
  border-radius: 4px;
  padding 0 16px;
  // padding: 7px 16px 9px;
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
    background-color: ${props => props.theme.primary.dark};
  }
`;

export default Button;
