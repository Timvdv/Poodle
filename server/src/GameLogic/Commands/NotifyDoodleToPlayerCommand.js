/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function NotifyDoodleToPlayerCommand(playerId, gameId, doodleName){
    var playerId = playerId;
    var gameId = gameId;
    var doodleName = doodleName;
    var commandName = "NotifyDoodleToPlayerCommand";
    var commandType = "systemCommand";

    this.executeCommand = function(systemNavigator){
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyDoodleToPlayer(playerId, gameId, doodleName);
    }

    this.getPlayerId = function(){
        return playerId;
    }

    this.getGameId = function(){
        return gameId;
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getParameters = function(){
        return {playerId: playerId, gameId: gameId, doodleName: doodleName};
    }
}