/**
 * Created by oteken on 6/5/2017.
 */
module.exports = function StartGameRequestCommand(gameId){
    var gameId = gameId;
    var commandType = "systemCommand";
    var response = "Starting game was not allowed.";
    var allowed = false;

    this.executeCommand = function(navigator){
        var gamesManager = navigator.getGamesManager();
        console.log("game exists = " + gamesManager.gameExists(gameId));
        if(gamesManager.gameExists(gameId)) {
            response = "Starting game was allowed."
            allowed = true;
        }
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }

    this.getAllowed = function(){
        return allowed;
    }
}