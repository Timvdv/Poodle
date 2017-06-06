/**
 * Created by oteken on 6/6/2017.
 */
module.exports = function GetPlayerDoodleCommand(playerId, gameId){
    var playerId = playerId;
    var gameId = gameId;
    var response = {};
    var commandType = "gameCommand";

    this.executeCommand = function(gameManipulator){
        gameManipulator.notifyDoodleToPlayer(playerId);
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
    this.getCommandType = function(){
        return commandType;
    }
}