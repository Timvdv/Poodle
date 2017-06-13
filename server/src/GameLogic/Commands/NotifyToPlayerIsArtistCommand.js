/**
 * Created by oteken on 6/12/2017.
 */
module.exports = function NotifyToPlayerIsArtistCommand(playerId, gameId){
    var playerId = playerId;
    var gameId = gameId;
    var commandName = "NotifyToPlayerIsArtistCommand";
    var commandType = "systemCommand";

    this.executeCommand = function(systemNavigator){
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyToPlayerIsArtist(playerId, gameId);
        console.log("The game id = " + gameId);
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
        return {playerId: playerId, gameId: gameId};
    }
}