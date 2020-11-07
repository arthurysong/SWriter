import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// redux-persist is used to persist the authentication token and refresh token between refresh
// See ./reducer/configureStore.js and redux-persist documentation
import { PersistGate } from'redux-persist/integration/react';
// import reducer from './reducer';
import configureStore from './reducer/configureStore';

// const store = createStore(reducer, applyMiddleware(thunk));
const { store, persistor } = configureStore();
window.store = store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
