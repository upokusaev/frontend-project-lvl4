import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: gon.messages.slice(0),
  reducers: {
    addMessage(state, action) {
      state.push(action.payload.data.attributes);
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
