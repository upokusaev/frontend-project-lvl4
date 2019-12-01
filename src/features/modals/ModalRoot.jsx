import React from 'react';
import { connect } from 'react-redux';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalDeleteChannel from './ModalDeleteChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';

const mapStateToProps = (state) => ({
  modalType: state.modals.modalType,
});

const modalComponents = {
  ADD_CHANNEL: ModalAddChannel,
  DELETE_CHANNEL: ModalDeleteChannel,
  RENAME_CHANNEL: ModalRenameChannel,
};

const ModalRoot = ({ modalType }) => {
  if (!modalType) return null;

  const CurrentModal = modalComponents[modalType];

  return (<CurrentModal />);
};

export default connect(
  mapStateToProps,
  null,
)(ModalRoot);
