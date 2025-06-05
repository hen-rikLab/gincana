const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // pasta onde ficarão host e telao

io.on('connection', (socket) => {
  socket.on('question', (question) => {
    io.emit('question', question);
  });

  socket.on('point', (data) => {
    io.emit('point', data);
  });

  socket.on('timer', (duration) => {
    io.emit('timer', duration);
  });

  socket.on('resetTelao', () => {
    io.emit('resetTelao');
  });
});

http.listen(8080, () => {
  console.log('Servidor rodando em http://localhost:8080');
});