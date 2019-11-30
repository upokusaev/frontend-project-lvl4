import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    listChannels: gon.channels.slice(0),
    currentChannelId: gon.currentChannelId,
  },
  reducers: {
    addChannel(state, action) {
        // const { name } = action.payload;
        // state.push({ id, text, completed: false })
    },
    setActiveChannel(state, action) {
      state.currentChannelId = action.payload.id;
    }
  }
})

export const { addChannel, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
