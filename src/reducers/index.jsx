import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice.jsx';
import messagesReducer from '../features/messages/messagesSlice.jsx';
import modalsReducer from '../features/modals/modalsSlice.jsx';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modals: modalsReducer,
});
