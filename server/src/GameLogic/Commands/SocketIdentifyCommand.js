/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function SocketIdentifyCommand(playerId, gameId, socketId){
    var playerId = playerId;
    var gameId = gameId;
    var socketId = socketId;
    var response = {};
    var commandType = "systemCommand";

    this.executeCommand = function(navigator){
        var notificationAdapter = navigator.getNotificationAdapter();
        notificationAdapter.identifySocketConnection(playerId, gameId, socketId);
        console.log("Identified socket " + socketId + " with player " + playerId + " joining the game " + gameId);
    }

    this.getResponse = function(){
        return response;
    }

    this.getPlayerId = function(){
        return playerId;
    }

    this.getGameId = function(){
        return gameId;
    }

    this.getSocketId = function(){
        return socketId;
    }

    this.getCommandType = function(){
        return commandType;
    }
}