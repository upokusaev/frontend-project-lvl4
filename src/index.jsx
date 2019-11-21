import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  static defaultProps = {
    channels: [],
    messages: [],
  }

  renderChannels = () => {
    const { channels } = this.props;
    return (
      <div class="col-3">
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          {channels.map((c) => (
            <a class="nav-link" id={c.id} data-toggle="pill" href={`#${c.name}`} role="tab" aria-controls={c.name} aria-selected="false">{c.name}</a>
          ))}
        </div>
      </div>
    );
  }

  renderMessages = () => {
    const { messages } = this.props;
    return (
      <div class="col-9">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div class="row">
        {this.renderChannels()}
        {this.renderMessages()}
      </div>
    );
  }
};

export default (channels, messages) => {
  const mountNode = document.getElementById('chat');
  render( <App channels={channels} messages={messages} />, mountNode );
};
