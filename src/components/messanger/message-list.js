import React, { Component } from 'react';
import _ from 'lodash';

class MessageList extends Component {

  renderMessages(messages) {
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
  }
  
  render() {
    return (
      <ol className="chat__messages">
        {this.renderMessages(this.props.messages)}
      </ol>
    );
  }

}


export default MessageList;