import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice.jsx';
import messagesReducer from '../features/messages/messagesSlice.jsx';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer
});
