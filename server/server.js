const path = require('path');

const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const clientPath = path.join(__dirname, '..', 'build');

const cors = require('cors')

const moment = require('moment');

const { Users } = require ('./users');


const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const users = new Users();


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

      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);




      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.broadcast.to(params.room).emit('newMessage', {
        from: 'Admin',
        text: `${params.name} joined!`,
        createdAt: moment().valueOf()
      })
    });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', {
        from: 'Admin',
        text: `${user.name} has left!`,
        createdAt: moment().valueOf()
      });
    }
  });

  socket.on('createMessage', (message, callback) => {
    
    const user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newMessage', {
      from: user.name,
      text: message.text,
      createdAt: new Date().getTime()
    });
    }

    

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