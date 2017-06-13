/**
 * Created by oteken on 5/9/2017.
 */

/*
 * This class is responsible for receiving requests and
 * sending the data of the request to the adapter object.
 */
module.exports = function SocketConnection(adapter, socketConnectionManager) {
    var io = require('socket.io')(6060);
    var adapter = adapter;
    var socketConnectionManager = socketConnectionManager;

    var sockets = {};

    io.on('connection', function (socket) {
        socketConnectionManager.addSocket(socket);
        var images = [];

        //This call links the socket of a client with the game it is participating in.
        socket.on('identifyGame', function(playerId, gameId){
            socketConnectionManager.identifySocketConnection(playerId, gameId, socket.id);
        });

        socket.on('startGame', function(){
            adapter.startGameRequest(socket.id);
        });

        socket.on('getImages', function () {
            var doodles = adapter.getGameDoodles(socket.id);
            images = doodles;
            socket.emit('setImages', doodles);
        });

        socket.on('getDoodle', function(){
            adapter.notifyDoodleToPlayer(socket.id);
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
            socketConnectionManager.deleteSocket(socket.id);
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
        io.emit(eventName, data);
    };

    this.notifySpecific = function(eventName, data, socketId){
        var socket = socketConnectionManager.getSocket(socketId);
        if(socket) {
            socket.emit(eventName, data);
        }
    }
}