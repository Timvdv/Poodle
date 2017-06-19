/**
 * Created by oteken on 5/28/2017.
 */

/*
 * This class is responsible for receiving data from the system
 * and process this data into an agreed upon object to the front-end.
 * After this processing the object is sent through the websocket.
 */
module.exports = function NotificationAdapter(socketConnection, socketConnectionManager){
    var socketConnection = socketConnection;
    var socketConnectionManager = socketConnectionManager;

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

    this.notifyComposePhaseStarted = function(gameId){
        var data = {started: true};
        var eventName = "composePhase";
        notifyAllGameSockets(eventName, data, gameId);
    }

    this.notifyToPlayerIsArtist = function(playerId, gameId, artTitle){
        var socketId = socketConnectionManager.getSocketIdOfPlayer(playerId, gameId);
        var data = {isArtist: true, artTitle: artTitle};
        var eventName = "isArtist";
        socketConnection.notifySpecific(eventName, data, socketId);
    }

    this.notifyTimeLeft = function(gameId, timeLeft){
        var data = {timeLeft: timeLeft};
        var eventName = "timer";
        notifyAllGameSockets(eventName, data, gameId);
    }

    this.notifyDoodleToPlayer = function(playerId, gameId, doodleName){
        var socketId = socketConnectionManager.getSocketIdOfPlayer(playerId, gameId);
        var eventName = "setDoodle";
        var data = {doodleName: doodleName};
        socketConnection.notifySpecific(eventName, data, socketId);
    }

    function notifyAllGameSockets(eventName, data, gameId){
        var game = socketConnectionManager.getSocketsForGame(gameId);
        for (var i = 0; i < game.length; i++) {
            socketConnection.notifySpecific(eventName, data, game[i].socketId);
        }
    }
}