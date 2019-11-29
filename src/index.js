import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import app from './components/App.jsx';
import io from 'socket.io-client';

// import { addMessage } from './features/messages/AddMessage.jsx'
import faker from 'faker';
// import gon from 'gon';
import cookies from 'js-cookie';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

faker.locale = "ru";

const setUserName = () => {
  const newUserName = faker.name.findName();
  cookies.set('userName', newUserName);
  return newUserName;
}

const getUserName = () => {
  const cookiesName = cookies.get('userName');
  return cookiesName ? cookiesName : setUserName();
}

app(getUserName());

const socket = io();
socket.on('connect', () => {
  console.log('Подключились');
  socket.on('disconnect', () => {
    console.log('Отключились');
  });
});
