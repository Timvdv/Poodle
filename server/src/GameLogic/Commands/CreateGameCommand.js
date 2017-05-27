/**
 * Created by oteken on 5/27/2017.
 */
module.exports = function CreateGameCommand(){
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(gamesManager){
        console.log("creating a game.....");
        var gameCreator = gamesManager.getGameCreator();
        var gameManipulator = gameCreator.createNewGame();
        gamesManager.addGameManipulator(gameManipulator);
        var gameId = gameManipulator.getGameId()
        response = {gameId: gameId};
        console.log("Created a new Game with id " + gameId);
    }

    this.getGameId = function(){
        return gameId;
    }
    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }
}