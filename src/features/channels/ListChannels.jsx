import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { setActiveChannel } from '../channels/channelsSlice.jsx';

const mapStateToProps = (state) => ({
  channels: state.channels.listChannels,
  currentChannelId: state.channels.currentChannelId,
})

const mapDispatchToProps = { setActiveChannel }

const ListChannels = ({channels, currentChannelId, setActiveChannel}) => {

  const handleClick = (id) => () => {
    setActiveChannel({ id });
  }

  return (
    <div className="col-3 d-flex flex-column p-3 bg-light border-right">
      <div class="btn-group-vertical">
        {channels.map((c) => {
          const isActive = (currentChannelId === c.id);
          const newClass = cn({
            'text-left': true,
            'btn': true,
            'btn-warning': isActive,
            'btn-dark': !isActive,
          });
          return <button type="button" class={newClass} key={c.id} onClick={handleClick(c.id)}>{`#${c.name}`}</button>
        })}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListChannels)
