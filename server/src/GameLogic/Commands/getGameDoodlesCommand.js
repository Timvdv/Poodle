/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function getGameDoodlesCommand(gameId){
    var gameId = gameId;
    var response = {};
    var commandType = "gameCommand";

    this.executeCommand = function(gameManipulator){
        var doodles = gameManipulator.getDoodles();

        response = {gameId: gameManipulator.getGameId(), gameDoodles: doodles};
    }

    this.getResponse = function(){
        return response;
    }

    this.getGameId = function(){
        return gameId;
    }
    this.getCommandType = function(){
        return commandType;
    }
}