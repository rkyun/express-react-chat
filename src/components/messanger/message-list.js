import React from 'react';
import _ from 'lodash';

const MessageList = props =>{


  const renderMessages = messages => {
    return _.map(messages, message => {
      return (
        <li key={message.createdAt}>
          <strong>{message.from}:</strong> <span>{message.text}</span>
        </li>
      );
  });
  };

  return (
    <ul>
      {renderMessages(props.messages)}
    </ul>
  );
}


export default MessageList;