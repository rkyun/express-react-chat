import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import MessageForm from './messanger/message-form';
import MessageList from './messanger/message-list';

import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:1337');

class App extends Component {

  constructor(props) {
    super(props);
    props.setSocket(socket);
    socket.on('connect', ()=>{
      console.log('Connected to server');
    });

    socket.on('disconnect', ()=>{
      console.log('Disconnected from server');
    });

    socket.emit('createMessage', {
      from: 'Michal',
      text: 'No siema',
      createdAt: new Date().getTime()
    }, (data)=>{
      console.log('Got it', data);
    })

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
export default connect(mapStatetoProps, actions)(App);
