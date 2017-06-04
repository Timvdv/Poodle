/**
 * Created by oteken on 5/9/2017.
 */

module.exports = function SocketConnection(adapter) {
    var io = require('socket.io')(6060);

    var socketInfo = {};

    io.on('connection', function (socket) {
        socketInfo[socket.id] = [];
        socketInfo[socket.id].socket = socket;
        console.log("Goteem");
        socket.emit('news', {hello: 'world'});

        var images = [{
            id: 1,
            x: 50,
            y: 10,
            url: 'https://upload.wikimedia.org/wikibooks/en/4/43/Video_game_fencing.png'
        }, {
            id: 2,
            x: 30,
            y: 10,
            url: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/05/Best-Images-2017.jpg'
        }, {
            id: 3,
            x: 10,
            y: 10,
            url: 'http://iheartdogs.com/wp-content/uploads/2017/01/Poodle-1.jpg'
        }]

        socket.on('getImages', function (gameId) {
            var doodles = adapter.getGameDoodles(gameId);
            socket.emit('setImages', doodles);
        });

        socket.on('updateImages', function(image) {

            const index = findIndexInData(images, 'id', image.id);

            if(index != -1) {
                images[index].x = image.x;
                images[index].y = image.y;
                socket.broadcast.emit('positionChangeImages', images);
            }

        });

        socket.on('disconnect', function (data) {
            delete socketInfo[socket.id];
        });
    });

    function findIndexInData(data, property, value) {
        for(var i = 0, l = data.length ; i < l ; i++) {
            if(data[i][property] === value) {
                return i;
            }
        }
        return -1;
    }

    this.notify = function(eventName, data){
        console.log("Event :" + eventName + " notifying :" + data.playerId);
        io.emit(eventName, data);
    }
}