import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import { Provider } from 'react-redux';
import store from './components/Redux/Store';

import AutoLogin from './components/Authenticate/AutoLogin';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AutoLogin>
        <RouterProvider router = {router} />
      </AutoLogin>
    </Provider>      
  </React.StrictMode>
);



reportWebVitals();
