/**
 * Created by oteken on 5/28/2017.
 */
module.exports = function NotificationAdapter(socketConnection){

    var identifiedSocketConnections = [];
    var gameSockets = [];

    this.notifyNewPlayerAdded = function(player, game){
        var data = {playerId : player.getId(), playerName: player.getName(), gameId: game.getGameId()};
        var eventName = "playerJoined"
        socketConnection.notify(eventName, data);
    }

    this.identifySocketConnection = function(playerId, gameId, socketId){
        identifiedSocketConnections[socketId] = [];
        identifiedSocketConnections[socketId].socketId = socketId;
        identifiedSocketConnections[socketId].playerId = playerId;
        identifiedSocketConnections[socketId].gameId = gameId;
        if(gameSockets[gameId] == undefined)
            gameSockets[gameId] = [];
        gameSockets[gameId].socketId = socketId;
        gameSockets[gameId].gameId = gameId;
    }

    this.notifyDoodleToPlayer = function(playerId, gameId, doodleName){
        var socketId = getSocketOfPlayer(playerId, gameId);
        var eventName = "updateDoodle";
        var data = {doodleName: doodleName};
        socketConnection.notifySpecific(eventName, data, socketId);
    }

    function getSocketOfPlayer(playerId, gameId){
        var socketId;
        for (var property in gameSockets) {
            if(property.gameId = gameId)
                socketId = property.socketId;
        }
        return socketId;
    }
}