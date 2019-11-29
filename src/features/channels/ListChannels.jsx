import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

const mapStateToProps = (state) => ({
  channels: state.channels.listChannels,
  currentChannelId: state.channels.currentChannelId,
})

// const mapDispatchToProps = {  }

const ListChannels = ({channels, currentChannelId}) => {
  return (
    <div className="d-flex flex-column m-2">
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        {channels.map((c) => {
          const newClass = cn({
            'nav-link': true,
            active: (currentChannelId === c.id),
          });
          return <a className={newClass} id={c.id} data-toggle="pill" href={`#${c.name}`} role="tab" aria-controls={c.name} aria-selected="false">{`#${c.name}`}</a>
        })}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps
)(ListChannels)
