import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from './routes/Routes';
import monitor from './assets/images/monitor.jpg';

const StyledApp = styled.div`
  font-family: ${props => props.theme.fontFamily.main};
  height: 100%;

  .mediaSizeOkay {
    height: 100%;

    @include lg {
      display: none;
    }
  }

  .mediaSizeNotOkay{
    display: none;
    height: 100%;
    background-color: rgb(59, 59, 59);
    color: white;
    text-align: center;

    @include lg {
      display: block;
    }

    h3 {
      // margin-top: 40px;
      padding-top: 80px;
      font-size: 40px;
    }

    img {
      margin-top: 42px;
    }

    .mediaSizeNotOkay__p {
      // margin-top: 40px;
      // margin: 40px auto 0;
      margin: 40px auto 0;
      width: 80%;
      // line-height: 22px;
      // line-height: 44px;
    }

    .mediaSizeNotOkay__small {
      margin: 16px auto 0;
      width: 80%;
      font-size: .8em;
      color: rgb(156, 156, 156);
    }

    h1 {
      // font-size: 100px;
      margin-top: 44px;
      color: rgb(99, 189, 71)
    }
  }
`;

function App() {
  return (
    <StyledApp>
      <div className="mediaSizeOkay">
        <Router><Routes /></Router>
      </div>

      {/* <div className="mediaSizeNotOkay">
        <h3>
          MWriter says...
        </h3>
        <img src={monitor} alt="desktop monitor icon" height="120px"/>
        <p className="mediaSizeNotOkay__p"> 
          Please use this app on a desktop device. 
        </p>
        <p className="mediaSizeNotOkay__small">
          We still need to size everything for mobile and tablet versions. 
        </p>
        <h1>
          Thanks!
        </h1>
      </div> */}
    </StyledApp>
  );
}

export default App;
