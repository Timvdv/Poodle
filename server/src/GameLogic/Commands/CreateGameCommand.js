/**
 * Created by oteken on 5/27/2017.
 */
module.exports = function CreateGameCommand(){
    var commandName = "CreateGameCommand";
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(systemNavigator){
        var gamesManager = systemNavigator.getGamesManager();
        var gameCreator = gamesManager.getGameCreator();
        var gameNavigator = gameCreator.createNewGame();

        gamesManager.addGameNavigator(gameNavigator);
        var gameId = gameNavigator.getGame().getGameId()

        response = {gameId: gameId};
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
        return {};
    }
}