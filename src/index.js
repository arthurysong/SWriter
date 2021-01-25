import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

// redux-persist is used to persist the authentication token and refresh token between refresh
// See ./reducer/configureStore.js and redux-persist documentation
import { PersistGate } from'redux-persist/integration/react';
import configureStore from './redux/reducer/configureStore';

import theme from './theme';

const { store, persistor } = configureStore();
window.store = store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Loading prop is the component that shows while redux is loading the persistent state from storage into redux */}
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
