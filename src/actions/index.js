import {CONNECT,DISCONNECT, SEND_MESSAGE, APPEND_MESSAGE, JOIN_ROOM} from './types';

import moment from 'moment';

export function connect(io){
  return {
    type: CONNECT,
    payload: io
  }
}

export function disconnect(){
  return {
    type: DISCONNECT
  }
}

export function createMessage(io, data){
  io.emit('createMessage', data, (data)=>{
      console.log('Got it', data);
    });
  return {
    type: SEND_MESSAGE
  }
}

export function appendMessage(data){
  data.createdAtFormatted = moment(data.createdAt).format('HH:mm');
  return {
    type: APPEND_MESSAGE,
    payload: data
  }
}

export function joinRoom(data){

  console.log(data);
  return{
    type: JOIN_ROOM,
    payload: data
  }
}