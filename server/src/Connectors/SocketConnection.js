/**
 * Created by oteken on 5/9/2017.
 */

module.exports = function SocketConnection(server, adapter) {
    var io = require('socket.io')(6060);

    var socketInfo = {};

    io.on('connection', function (socket) {
        socketInfo[socket.id] = [];
        socketInfo[socket.id].socket = socket;
        console.log("Goteem");
        socket.emit('news', {hello: 'world'});

        var images = [{
            x: 50,

            y: 10,

            url: 'https://upload.wikimedia.org/wikibooks/en/4/43/Video_game_fencing.png'
        }, {
            x: 30,

            y: 10,

            url: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/05/Best-Images-2017.jpg'
        }, {
            x: 10,

            y: 10,

            url: 'http://iheartdogs.com/wp-content/uploads/2017/01/Poodle-1.jpg'
        }]

        socket.on('getImages', function () {
            console.log("blabal")
            socket.emit('setImages', images);
        });

        socket.on('updateImages', function(){

        });
        // BROADCAST VOORBEELD: socket.broadcast.emit('news', pixel_array);

        socket.on('disconnect', function (data) {
            delete socketInfo[socket.id];
        });
    });



}