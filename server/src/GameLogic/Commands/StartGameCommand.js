/**
 * Created by oteken on 5/18/2017.
 */
module.exports = function StartGameCommand(gameId){
    var gameId = gameId;
    var commandName = "StartGameCommand";
    var commandType = "gameCommand";

    this.executeCommand = function(gameNavigator){
        var gameRunner = gameNavigator.getGameRunner();
        gameRunner.startGame();
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
        return {gameId: gameId};
    }
}