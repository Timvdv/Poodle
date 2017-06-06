/**
 * Created by oteken on 5/28/2017.
 */

/*
 * This class is responsible for receiving data from the system
 * and process this data into an agreed upon object to the front-end.
 * After this processing the object is sent through the websocket.
 */
module.exports = function NotificationAdapter(socketConnection){

    var socketConnection = socketConnection;
    /*
     * Contains a reference to the identified sockets by a grouping of games.
     * This way it is faster to notify all players of a specific game.
     */
    var gameSockets = [];

    this.notifyNewPlayerAdded = function(player, game){
        var data = {playerId : player.getId(), playerName: player.getName(), gameId: game.getGameId()};
        var eventName = "playerJoined";
        socketConnection.notify(eventName, data);
    }

    this.notifyGameStarted = function(gameId){
        var data = {started: true};
        var eventName = "gameStarted"
        notifyAllGameSockets(eventName, data, gameId);
    }

    this.identifySocketConnection = function(playerId, gameId, socketId){
        if (gameSockets[gameId] == undefined) {
            gameSockets[gameId] = [];
            gameSockets[gameId].gameId = gameId;
        }
        gameSockets[gameId].push({socketId: socketId, playerId: playerId});
    }

    this.notifyDoodleToPlayer = function(playerId, gameId, doodleName){
        var socketId = getSocketOfPlayer(playerId, gameId);
        var eventName = "updateDoodle";
        var data = {doodleName: doodleName};
        socketConnection.notifySpecific(eventName, data, socketId);
    }

    function getSocketOfPlayer(playerId, gameId){
        var socketId;
        var game = getSocketsForGame(gameId);
        for (var player in game) {
            if(player.playerId == playerId){
                socketId = player.socketId;
            }
        }
        return socketId;
    }

    function getSocketsForGame(gameId){
        for (var game in gameSockets) {
            if(game.gameId == gameId) {
                return game;
            }
        }
    }

    function notifyAllGameSockets(eventName, data, gameId){
        var game = getSocketsForGame(gameId);
        for (var player in game) {
            socketConnection.notifySpecific(eventName, data, player.socketId)
        }
    }
}