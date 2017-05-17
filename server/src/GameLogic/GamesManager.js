/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GamesManager(gameManipulator){

    var gameManipulators = [];
    gameManipulators.push(gameManipulator);

    this.executeCommand = function(command){
        if(commandAllowed(command)) {
            command.executeCommand(getGame(command.getGameId()));
        }
    }

    function commandAllowed(command){
        var allowed = false;
        if(gameExists(command.getGameId())){
            allowed = true;
        }
        return allowed;
    }

    function getGame(gameId){
        for (var i = 0; i < gameManipulators.length; i++) {
            if(gameId == gameManipulators[i].getGameId()){
                return gameManipulators[i];
            }
        }
        return "";
    }

    function gameExists(gameId){
        for (var i = 0; i < gameManipulators.length; i++) {
            if(gameId == gameManipulators[i].getGameId()){
                return true;
            }
        }
        return false;
    }
}