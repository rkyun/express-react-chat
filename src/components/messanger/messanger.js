import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import MessageForm from './message-form';
import MessageList from './message-list';

import './messanger.css';
import io from 'socket.io-client';



class Messanger extends Component {

  componentWillMount(){
    const socket = io.connect('http://192.168.1.5:1337');
    this.props.connect(socket);
    const params = {name: this.props.user, room: this.props.room}
    console.log(params, 'das');
    socket.on('connect', ()=>{
      console.log('Connected to server');

      socket.emit('join', params);

      

    });

    socket.on('disconnect', ()=>{
      console.log('Disconnected from server');
    });

    socket.on('updateUserList', (users)=> {
      console.log(`Users list ${users}`);
    })

    socket.on('newMessage', (message) =>{
      this.props.appendMessage(message);
    });
  }

  componentWillUnmount() {
    this.props.io.disconnect();
    this.props.disconnect();
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
  return {io: state.app.socket, messages: state.app.messages, user: state.app.user, room: state.app.room}
}
export default connect(mapStatetoProps, actions)(Messanger);
