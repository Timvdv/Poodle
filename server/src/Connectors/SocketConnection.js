/**
 * Created by oteken on 5/9/2017.
 */

/*
 * This class is responsible for receiving requests and
 * sending the data of the request to the adapter object.
 */
module.exports = function SocketConnection(adapter) {
    var io = require('socket.io')(6060);

    var socketInfo = {};

    io.on('connection', function (socket) {
        addSocket(socket);

        //This call links the socket of a client with the game it is participating in.
        socket.on('identifyGame', function(playerId, gameId){
            adapter.identifySocketConnection(playerId, gameId, socket.id);
        });

        socket.on('startGame', function(gameId){
            var response = adapter.startGameRequest(gameId);
        });

        socket.on('getImages', function (gameId) {
            var doodles = adapter.getGameDoodles(gameId);
            socket.emit('setImages', doodles);
        });

        socket.on('getDoodle', function(playerId, gameId){
            adapter.notifyDoodleToPlayer(playerId, gameId);
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

    function addSocket(socket){
        socketInfo[socket.id] = [];
        socketInfo[socket.id].socket = socket;
    }

    function findIndexInData(data, property, value) {
        for(var i = 0, l = data.length ; i < l ; i++) {
            if(data[i][property] === value) {
                return i;
            }
        }
        return -1;
    }

    this.notify = function(eventName, data){
        io.emit(eventName, data);
    };

    this.notifySpecific = function(eventName, data, socketId){
        if(socketId != undefined) {
            var socket = socketInfo[socketId].socket;
            socket.emit(eventName, data);
        }
    }
};