/**
 * Created by oteken on 5/18/2017.
 */
module.exports = function StartGameCommand(gameId){
    var gameId = gameId;
    var commandType = "gameCommand";

    this.executeCommand = function(gameManipulator){
        gameManipulator.getGameRunner().startGame();
    }

    this.getGameId = function(){
        return gameId;
    }
    this.getCommandType = function(){
        return commandType;
    }

}