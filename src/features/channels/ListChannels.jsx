import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { FaRegEdit, FaRegTimesCircle } from 'react-icons/fa';
import { actions as actionsChannels } from './channelsSlice.jsx';
import { actions as actionsModals } from '../modals/modalsSlice.jsx';

const mapStateToProps = (state) => ({
  channels: state.channels.listChannels,
  currentChannelId: state.channels.currentChannelId,
});

const mapDispatchToProps = {
  setActiveChannel: actionsChannels.setActiveChannel,
  showModal: actionsModals.showModal,
};

const ListChannels = ({
  showModal, setActiveChannel, channels, currentChannelId, children,
}) => {
  const handleClick = (id) => () => {
    setActiveChannel({ id });
  };

  const openDeleteModal = (channelId, channelName) => () => {
    showModal({
      modalType: 'DELETE_CHANNEL',
      modalProps: {
        channelId,
        channelName,
      },
    });
  };

  const openRenameModal = (channelId, channelName) => () => {
    showModal({
      modalType: 'RENAME_CHANNEL',
      modalProps: {
        channelId,
        channelName,
      },
    });
  };

  return (
    <div className="col-3 d-flex flex-column p-3 bg-light border-right">
      <div className="btn-group-vertical overflow-auto">
        {channels.map((c) => {
          const isActive = (currentChannelId === c.id);
          const newClass = cn({
            'd-flex': true,
            'justify-content-between': true,
            'text-left': true,
            'btn-warning': isActive,
            'btn-dark': !isActive,
            btn: true,
            key: c.id,
          });
          return (
            <button
              type="button"
              className={newClass}
              key={c.id}
              onClick={handleClick(c.id)}
            >
              <span>{`#${c.name}`}</span>
              <span className="d-flex">
                <div
                  className="pl-2 pr-2 d-inline-block h-100"
                  onClick={openRenameModal(c.id, c.name)}
                  onKeyPress={openRenameModal(c.id, c.name)}
                  role="button"
                  tabIndex={c.id}
                >
                  <FaRegEdit />
                </div>
                { c.removable ? (
                  <div
                    className="pl-2 pr-2 d-inline-block h-100"
                    onClick={openDeleteModal(c.id, c.name)}
                    onKeyPress={openDeleteModal(c.id, c.name)}
                    role="button"
                    tabIndex={c.id}
                  >
                    <FaRegTimesCircle />
                  </div>
                ) : null }
              </span>
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListChannels);
