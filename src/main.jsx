import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '356979325468-b2lltd56t9jr0590sube8b2jfifbodle.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <GoogleOAuthProvider clientId={clientId}>
      <App/>
  </GoogleOAuthProvider>
)
