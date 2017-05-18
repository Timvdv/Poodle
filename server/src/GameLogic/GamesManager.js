/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GamesManager(gameManipulator, gameRunner){

    var gameManipulators = [];
    gameManipulators.push(gameManipulator);
    var gameRunners = [];
    gameRunners.push(gameRunner)

    this.executeCommand = function(command){
        if(commandAllowed(command)) {
            command.executeCommand(getGameManipulator(command.getGameId()));
        }
    }

    this.executeCommandTest = function(command){
        if(commandAllowed(command)) {
            command.executeCommand(getGameRunner(command.getGameId()));
        }
    }

    this.startGame = function(gameId){
        if(gameExists(gameId)){
            getGameRunner(gameId).startGame();
        }
    }

    function commandAllowed(command){
        var allowed = false;
        if(gameExists(command.getGameId())){
            allowed = true;
        }
        return allowed;
    }

    function getGameRunner(gameId){
        for (var i = 0; i < gameRunners.length; i++) {
            console.log(i);
            if(gameId == gameRunners[i].getGameId()){
                return gameRunners[i];
            }
        }
        return undefined;
    }

    function getGameManipulator(gameId){
        for (var i = 0; i < gameManipulators.length; i++) {
            if(gameId == gameManipulators[i].getGameId()){
                return gameManipulators[i];
            }
        }
        return undefined;
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