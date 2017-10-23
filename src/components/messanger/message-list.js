import React, { Component } from 'react';
import _ from 'lodash';

class MessageList extends Component {

  scrollToBottom(element) {
    if(element.childElementCount > 2){
      const clientHeight = element.clientHeight;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;

      const newMessage = element.lastChild;
      const newMessageHeight = newMessage.clientHeight;
      const lastMessageHeight = newMessage.previousSibling.clientHeight;
      console.log(lastMessageHeight);
      if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight  >= scrollHeight){
        element.scrollTop = scrollHeight;
      }
    }
    
  }

  componentDidMount() {
    this.scrollToBottom(this.messageListElement);
  }

  componentDidUpdate() {
    this.scrollToBottom(this.messageListElement);
  }
  
  renderMessages(messages) {
    return _.map(messages, message => {
      return (
        <li key={message.createdAt} className="message">
          <div className="message__title">
            <h4>{message.from}</h4>
            <span>{message.createdAtFormatted}</span>
          </div>
          <div className="message__body">
            <p>{message.text}</p>
          </div>

        </li>
      );
    });
  };
  render() {
    return (
      <ol className="chat__messages" ref={(ol) => {
        this.messageListElement = ol;
      }}>
        {this.renderMessages(this.props.messages)}
      </ol>
    );
  }

}


export default MessageList;