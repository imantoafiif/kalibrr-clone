import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const clientId = '356979325468-b2lltd56t9jr0590sube8b2jfifbodle.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <App/>
    </GoogleOAuthProvider>
  </Provider>
)
