/**
 * Created by oteken on 6/6/2017.
 */
module.exports = function GetPlayerDoodleCommand(playerId, gameId){
    var playerId = playerId;
    var gameId = gameId;
    var commandName = "GetPlayerDoodleNameCommand";
    var commandType = "gameCommand";
    var response = {};

    this.executeCommand = function(gameNavigator){
        var gameManipulator = gameNavigator.getGameManipulator();
        gameManipulator.notifyDoodleToPlayer(playerId);
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

    this.getResponse = function(){
        return response;
    }

    this.getParameters = function(){
        return {playerId: playerId, gameId: gameId};
    }
}