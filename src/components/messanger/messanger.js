import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import MessageForm from './message-form';
import MessageList from './message-list';

import './messanger.css';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.1.6:1337');

class Messanger extends Component {

  constructor(props) {
    super(props);
    props.setSocket(socket);
    socket.on('connect', ()=>{
      console.log('Connected to server');
    });

    socket.on('disconnect', ()=>{
      console.log('Disconnected from server');
    });

    socket.on('newMessage', (message) =>{
      this.props.appendMessage(message);
    });
  }

  render() {

    return (
      <div className="App chat">
        <div className="chat__sidebar">
          <h3>People</h3>
          <div id="users"></div>
        
        </div>
        <div className="chat__main">
            <MessageList messages={this.props.messages} />
          <div className="chat__footer">
            <MessageForm createMessage={this.props.createMessage} socket={this.props.io} />
          </div>
        </div>
        
    </div>
    );
  }
}

function mapStatetoProps(state){
  return {io: state.app.socket, messages: state.app.messages}
}
export default connect(mapStatetoProps, actions)(Messanger);
