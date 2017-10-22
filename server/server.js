const path = require('path');

const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const clientPath = path.join(__dirname, '..', 'build');


const app = express();

const server = http.createServer(app);

const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log('message', message);
  });

  socket.emit('newMessage', {
    from: 'Ziomboi',
    text: 'eloooooo!',
    createdAt: 2132321
  });

});





app.use(express.static(clientPath));

server.listen(1337, () => {
  console.log('Server listening on port 1337');
});