const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-8ffm.onrender.com',
        methods: ['GET','POST'],
    },
});

io.on('connection', (socket)=>{
    console.log(`User Connected : ${socket.id}`)

    socket.on('join_group', (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined group: ${data}`);
    });

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('recieve_message',data);
    });

    socket.on('disconnect',()=>{
        console.log('user Disconnected', socket.id);
    });
})


server.listen(4001,()=>{
    console.log('server is running...');
})
