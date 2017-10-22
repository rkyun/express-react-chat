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
      <div className="App">
        <p className="App-intro">
          Chat app
        </p>
        <MessageList messages={this.props.messages} />
        <MessageForm createMessage={this.props.createMessage} socket={this.props.io} />
        
    </div>
    );
  }
}

function mapStatetoProps(state){
  return {io: state.app.socket, messages: state.app.messages}
}
export default connect(mapStatetoProps, actions)(App);
