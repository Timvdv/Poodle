/**
 * Created by oteken on 5/9/2017.
 */

module.exports = function SocketConnection(server, adapter) {
    var io = require('socket.io')(server);

    var socketInfo = {};

    io.on('connection', function (socket) {
        socketInfo[socket.id] = [];
        socketInfo[socket.id].socket = socket;
        console.log("Goteem");
        socket.emit('news', {hello: 'world'});

        socket.on('my other event', function (data) {
            console.log(data);
        });

        // BROADCAST VOORBEELD: socket.broadcast.emit('news', pixel_array);

        socket.on('disconnect', function (data) {
            delete socketInfo[socket.id];
        });
    });
}