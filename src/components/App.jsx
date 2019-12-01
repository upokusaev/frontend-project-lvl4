import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import AddChannel from '../features/channels/AddChannel.jsx';
import ListChannels from '../features/channels/ListChannels.jsx';
import ListMessages from '../features/messages/ListMessages.jsx';
import AddMessage from '../features/messages/AddMessage.jsx';
import ModalRoot from '../features/modals/ModalRoot.jsx';
import UserNameContext from '../conexts/userNameContext.jsx';
import rootReducer from '../reducers';
import { actions as actionsChannels } from '../features/channels/channelsSlice.jsx';
import { actions as actionsMessages } from '../features/messages/messagesSlice.jsx';

const store = configureStore({
  reducer: rootReducer,
});

const { addChannel, removeChannel, renameChannel } = actionsChannels;
const { addMessage } = actionsMessages;

const socket = io();
socket.on('connect', () => {
  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });
});

const App = () => (
  <div className="d-flex flex-row border rounded h-100 shadow-lg">
    <ListChannels>
      <AddChannel />
    </ListChannels>
    <ListMessages>
      <AddMessage />
    </ListMessages>
  </div>
);

export default (userName) => {
  render(
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <App />
        <ModalRoot />
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
