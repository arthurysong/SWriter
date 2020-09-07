import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducer';

// const store = createStore(combineReducers({
//   reducer,
//   form: formReducer
// }), applyMiddleware(thunk))
// new

const store = createStore(reducer, applyMiddleware(thunk));
window.store = store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
