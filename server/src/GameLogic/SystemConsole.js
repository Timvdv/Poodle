/**
 * Created by oteken on 5/24/2017.
 */
module.exports = function SystemConsole(gamesManager){
    var gamesManager = gamesManager;

    this.executeCommand = function(command){
        /*
         * If inheritance was implemented, it would have been better to check if the given command was an instance of
         * the parent class GameCommand or SystemCommand instead of checking variables inside the commands.
         */
        if(command.getCommandType() == "systemCommand"){
            executeSystemCommand(command);
        } else if(command.getCommandType() == "gameCommand"){
            executeGameCommand(command);
        }
    }

    function executeSystemCommand(command){
            command.executeCommand(gamesManager);
    }

    function executeGameCommand(command){
        if(commandAllowed(command)) {
            command.executeCommand(gamesManager.getGameManipulator(command.getGameId()));
        }
    }

    function commandAllowed(command){
        var allowed = false;
        if(gamesManager.gameExists(command.getGameId())){
            allowed = true;
        }
        return allowed;
    }
}