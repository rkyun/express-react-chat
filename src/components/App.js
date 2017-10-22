import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

    socket.on('newMessage', (message) =>{
      console.log('New message', message)
    });
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Chat app
        </p>
      </div>
    );
  }
}

function mapStatetoProps(state){
  return {io: state.app.socket}
}
export default connect(mapStatetoProps, actions)(App);
