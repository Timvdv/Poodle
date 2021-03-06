/**
 * Created by oteken on 6/12/2017.
 */
module.exports = function SocketConnectionManager(){
    /*
     * Contains a reference to the identified sockets by a grouping of games.
     * This way it is faster to notify all players of a specific game.
     */
    var gameSockets = [];
    var sockets = {};

    this.addSocket = function(socket){
        sockets[socket.id] = [];
        sockets[socket.id].socket = socket;
    }

    this.getSocket = function(socketId){
        if(sockets[socketId])
            return sockets[socketId].socket;
    }

    this.deleteSocket = function(socketId){
        if(sockets[socketId])
            delete sockets[socketId];
    }

    function deleteGameSocket(playerId, gameId){
        var game = getSocketsForGame(gameId);
        for (var i = 0; i < game.length; i++) {
            if(game[i].playerId == playerId){
                game.splice(i, 1);
            }
        }
    }

    this.getPlayerIdFromSocketId = function(socketId){
        if(sockets[socketId]) {
            var playerId = sockets[socketId].playerId;
            return playerId;
        }
        return undefined;
    }

    this.getGameIdFromSocketId = function(socketId){
        if(sockets[socketId]) {
            var gameId = sockets[socketId].gameId;
            return gameId;
        }
        return undefined;
    }

    this.identifySocketConnection = function(playerId, gameId, socketId){
        if (gameSockets[gameId] == undefined) {
            gameSockets[gameId] = [];
            gameSockets[gameId].gameId = gameId;
        }
        var player = getSocketIdOfPlayer(playerId, gameId);
        if(player){
            deleteGameSocket(playerId, gameId);
        }
        gameSockets[gameId].push({socketId: socketId, playerId: playerId});
        sockets[socketId].playerId = playerId;
        sockets[socketId].gameId = gameId;
    }

    this.getSocketIdOfPlayer = function(playerId, gameId){
        var socketId;
        var game = this.getSocketsForGame(gameId);
        for (var i = 0; i < game.length; i++) {
            if(game[i].playerId == playerId){
                socketId = game[i].socketId;
            }
        }
        return socketId;
    }

    function getSocketIdOfPlayer(playerId, gameId){
        var socketId;
        var game = getSocketsForGame(gameId);
        for (var i = 0; i < game.length; i++) {
            if(game[i].playerId == playerId){
                socketId = game[i].socketId;
            }
        }
        return socketId;
    }

    this.getSocketsForGame = function(gameId){
        for (var game in gameSockets) {
            if(gameSockets[game].gameId == gameId) {
                return gameSockets[game];
            }
        }
    }

    function getSocketsForGame(gameId){
        for (var game in gameSockets) {
            if(gameSockets[game].gameId == gameId) {
                return gameSockets[game];
            }
        }
    }
}