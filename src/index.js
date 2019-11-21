import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import app from './index.jsx';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels } = window.gon;
const { messages } = window.gon;

app(channels, messages);