import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { actions as actionsModals } from './modalsSlice.jsx';
import { actions as actionsChannels } from '../channels/channelsSlice.jsx';
import routes from '../../routes';

const mapStateToProps = (state) => ({
  channelId: state.modals.modalProps.channelId,
  channelName: state.modals.modalProps.channelName,
});

const mapDispatchToProps = {
  hideModal: actionsModals.hideModal,
  setActiveChannel: actionsChannels.setActiveChannel,
};


const ModalDeleteChannel = ({
  hideModal, channelId, channelName, setActiveChannel,
}) => {
  const handleRemove = () => {
    axios.delete(routes.channelPath(channelId))
      .then(hideModal)
      .then(() => setActiveChannel({ id: 1 }))
      .catch(() => {
        throw new Error('Connection error'); // ПЕРЕДЕЛАТЬ
      });
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы точно хотите удалить канал
        <b>{` ${channelName} `}</b>
        ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={hideModal}>
          Отмена
        </Button>
        <Button variant="warning" onClick={handleRemove}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalDeleteChannel);
