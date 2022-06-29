// Подключение всех модулей к программе
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));
//Функция, которая срабатывает при подключении к странице
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        io.emit('message', { message: data.message, userName: data.userName });
    });
});

http.listen(3000, () => {
    console.log("listening on *:3000");
});