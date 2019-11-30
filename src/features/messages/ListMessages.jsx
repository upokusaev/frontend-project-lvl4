import React, { useEffect, useContext } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import cn from 'classnames';
import { UserNameContext } from '../../components/App.jsx'

const selectMessages = state => state.messages;
const selectCurrentChannelId = state => state.channels.currentChannelId;

const selectVisibleMessages = createSelector(
  [selectMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages.filter((m) => m.channelId === currentChannelId),
)

const mapStateToProps = (state) => ({
  messages: selectVisibleMessages(state),
})

const ListMessages = ({messages, children}) => {

  const userName = useContext(UserNameContext);

  useEffect(() => {
    setTimeout(() => {
      const lastMsg = document.querySelector('.last-msg'); // ТАК НЕЛЬЗЯ, ИСПРАВИТЬ!!!
      if (lastMsg) {
        lastMsg.scrollIntoView(true);
      }
    }, 100);
  })

  return (
    <div className="d-flex flex-column w-100">
      <div className="d-flex flex-column w-100 h-100 pl-4 pt-4 pr-4 overflow-auto">
      <div className="mt-auto"></div>
        { messages.map((m, i) => {
          const isMyMsg = m.userName === userName;
          const nameClass = cn({
            'd-flex': true,
            'rounded-top': true,
            'text-dark': true,
            'pl-2': true,
            'bg-warning': isMyMsg,
            'bg-light': !isMyMsg,
            'border': !isMyMsg,
          })
          const msgClass = cn({
            'last-msg': (i === messages.length - 1),
            'd-flex': true,
            'p-2': true,
            'bg-light': isMyMsg,
            'text-dark': isMyMsg,
            'border': isMyMsg,
            'bg-dark': !isMyMsg,
            'text-light': !isMyMsg,
          })
          return (
            <div className="mt-3">
              <div className={nameClass}>{m.userName}</div>
              <div className={msgClass}>{m.text}</div>
            </div>
          )
        }) }
      </div>
      {children}
    </div>
  );
};

export default connect(
  mapStateToProps
)(ListMessages)
