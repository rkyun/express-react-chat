const path = require('path');

const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const clientPath = path.join(__dirname, '..', 'build');

const cors = require('cors')

const moment = require('moment');


const app = express();

const server = http.createServer(app);

const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat!',
      createdAt: moment().valueOf()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: 'Admin',
    //   text: 'New user joined!',
    //   createdAt: moment().valueOf()
    // });

    socket.on('join', (params) =>{
      socket.join(params.room);

      console.log(params);

      socket.broadcast.to(params.room).emit('newMessage', {
        from: 'Admin',
        text: `${params.name} joined!`,
        createdAt: moment().valueOf()
      })
    });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });

  socket.on('createMessage', (message, callback) => {
    console.log('message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    callback('This is from the server');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });


});





app.use(express.static(clientPath));

server.listen(1337, () => {
  console.log('Server listening on port 1337');
});