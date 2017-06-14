/**
 * Created by oteken on 6/12/2017.
 */
module.exports = function NotifyToPlayerIsArtistCommand(playerId, gameId, artTitle){
    var playerId = playerId;
    var gameId = gameId;
    var artTitle = artTitle;
    var commandName = "NotifyToPlayerIsArtistCommand";
    var commandType = "systemCommand";

    this.executeCommand = function(systemNavigator){
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyToPlayerIsArtist(playerId, gameId, artTitle);
    }

    this.getPlayerId = function(){
        return playerId;
    }

    this.getGameId = function(){
        return gameId;
    }

    this.getArtTitle = function(){
        return artTitle;
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getParameters = function(){
        return {playerId: playerId, gameId: gameId, artTitle: artTitle};
    }
}