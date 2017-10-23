import React from 'react';
import _ from 'lodash';

const MessageList = props =>{


  const renderMessages = messages => {
    return _.map(messages, message => {
      return (
        <li key={message.createdAt} className="message">
          <div className="message__title">
            <h4>{message.from}</h4>
              <span>{message.createdAtFormmated}</span>
          </div>
          <div className="message__body">
              <p>{message.text}</p>
          </div>
          
        </li>
      );
  });
  };

  return (
    <ol className="chat__messages">
      {renderMessages(props.messages)}
    </ol>
  );
}


export default MessageList;