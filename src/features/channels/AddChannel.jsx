import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../modals/modalsSlice.jsx';

const mapDispatchToProps = {
  showModal: actions.showModal,
};

const AddChannel = ({ showModal }) => {
  const handleClick = () => {
    showModal({
      modalType: 'ADD_CHANNEL',
    });
  };

  return (
    <div className="mt-auto">
      <button type="button" className="btn btn-dark w-100 mt-3" onClick={handleClick}>Добавить канал</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps,
)(AddChannel);
