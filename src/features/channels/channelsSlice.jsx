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
  }
})

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
