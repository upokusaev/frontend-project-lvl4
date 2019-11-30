import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ListChannels from '../features/channels/ListChannels.jsx';
import ListMessages from '../features/messages/ListMessages.jsx';
import AddMessage from '../features/messages/AddMessage.jsx'
import rootReducer from '../reducers';
// import { addMessage } from '../features/messages/messagesSlice.jsx'
// import io from 'socket.io-client';

const store = configureStore({
  reducer: rootReducer
})

export const UserNameContext = React.createContext();

export default (userName) => {

  const App = () => {
    return (
      <div className="d-flex flex-row border rounded h-100 shadow-lg">
        <ListChannels/>
        <ListMessages>
          <AddMessage/>
        </ListMessages>
      </div>
    );
  };

  render(
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <App/>
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('chat')
  );
};
