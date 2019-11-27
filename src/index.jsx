import React from 'react';
import { render } from 'react-dom';
import cn from 'classnames';

class App extends React.Component {
  static defaultProps = {
    channels: [],
    messages: [],
    currentChannelId: 0,
  }

  renderChannels = () => {
    const { channels, currentChannelId } = this.props;
    return (
      <div className="d-flex flex-column mr-5">
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
  }

  renderMessages = () => {
    const { messages } = this.props;
    return (
      <div className="d-flex flex-column w-100">
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            { messages.map((m) => <div>{m.text}</div>) }
          </div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="d-flex flex-row">
        {this.renderChannels()}
        {this.renderMessages()}
      </div>
    );
  }
};

export default ({ channels, messages, currentChannelId }) => {
  const mountNode = document.getElementById('chat');
  render( <App channels={channels} messages={messages} currentChannelId={currentChannelId} />, mountNode );
};
