import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './components/Redux/Store'; // Import store and persistor

import AutoLogin from './components/Authenticate/AutoLogin';
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Wrap your components with PersistGate */}
        <AutoLogin>
          <RouterProvider router={router} />
        </AutoLogin>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
