import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import faker from 'faker';
import cookies from 'js-cookie';
import app from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

faker.locale = 'ru';

const setUserName = () => {
  const newUserName = faker.name.findName();
  cookies.set('userName', newUserName);
  return newUserName;
};

const getUserName = () => {
  const cookiesName = cookies.get('userName');
  return cookiesName || setUserName();
};

app(getUserName());
