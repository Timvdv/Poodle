/**
 * Created by oteken on 5/9/2017.
 */
var io = require('socket.io')(app);

var socketInfo = {};

io.on('connection', function (socket) {
    socketInfo[socket.id]  = [];
    socketInfo[socket.id].socket =  socket;

    socket.emit('news', { hello: 'world' });

    socket.on('my other event', function (data) {
        console.log(data);
    });

    // BROADCAST VOORBEELD: socket.broadcast.emit('news', pixel_array);

    socket.on('disconnect', function (data) {
        delete socketInfo[socket.id];
    });
});