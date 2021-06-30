import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import 'typeface-roboto'

ReactDOM.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-01def6kd.us.auth0.com"
    clientId="1JKZ7Od7hC81LUOSiifzWI3RF2laZPAV"
    redirectUri={"http://localhost:3000/admin/listing"}
    audience="https://dev-01def6kd.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
