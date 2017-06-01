/**
 * Created by oteken on 5/27/2017.
 */
module.exports = function CreateGameCommand(){
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(navigator){
        var gamesManager = navigator.getGamesManager();
        console.log("creating a game.....");
        var gameCreator = gamesManager.getGameCreator();
        var gameManipulator = gameCreator.createNewGame();
        var notifier = gameManipulator.getNotifier();
        notifier.setConsole(navigator.getConsole());
        gamesManager.addGameManipulator(gameManipulator);
        var gameId = gameManipulator.getGameId()
        response = {gameId: gameId};
        console.log("Created a new Game with id " + gameId);
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }
}