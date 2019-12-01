/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: { },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal(state, action) {
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    hideModal(state) {
      state.modalType = null;
      state.modalProps = { };
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
