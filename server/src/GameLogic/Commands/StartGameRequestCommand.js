/**
 * Created by oteken on 6/5/2017.
 */
module.exports = function StartGameRequestCommand(gameId){
    var gameId = gameId;
    var allowed = false;
    var commandName = "StartGameRequestCommand";
    var commandType = "systemCommand";
    var response = "Starting game was not allowed.";

    this.executeCommand = function(systemNavigator){
        var gamesManager = systemNavigator.getGamesManager();
        console.log("game exists = " + gamesManager.gameExists(gameId));
        if(gamesManager.gameExists(gameId)) {
            response = "Starting game was allowed."
            allowed = true;
        }
    }

    this.getAllowed = function(){
        return allowed;
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
        return {gameId: gameId, allowed: allowed};
    }
}