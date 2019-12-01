/* eslint-disable no-param-reassign */
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
      state.listChannels.push(action.payload.data.attributes);
    },
    removeChannel(state, action) {
      state.listChannels = state.listChannels.filter((c) => (
        (c.removable) ? c.id !== action.payload.data.id : true
      ));
    },
    renameChannel(state, action) {
      const newListChannel = state.listChannels.map((c) => {
        if (c.id === action.payload.data.id) {
          c.name = action.payload.data.attributes.name;
        }
        return c;
      });
      state.listChannels = newListChannel;
    },
    setActiveChannel(state, action) {
      state.currentChannelId = action.payload.id;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
