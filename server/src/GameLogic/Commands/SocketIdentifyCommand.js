/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function SocketIdentifyCommand(playerId, gameId, socketId){
    var playerId = playerId;
    var gameId = gameId;
    var socketId = socketId;
    var commandName = "SocketIdentifyCommand";
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(systemNavigator){
        var notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.identifySocketConnection(playerId, gameId, socketId);
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

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }

    this.getParameters = function(){
        return {playerId: playerId, gameId: gameId, socketId: socketId};
    }
}