/**
 * Created by oteken on 5/24/2017.
 */
module.exports = function Console(){
    var navigator;

    this.executeCommand = function(command){
        /*
         * If inheritance was implemented, it would have been better to check if the given command was an instance of
         * the parent class GameCommand or SystemCommand instead of checking variables inside the commands.
         */
        logCommand(command);
        if(command.getCommandType() == "systemCommand"){
            executeSystemCommand(command);
        } else if(command.getCommandType() == "gameCommand"){
            executeGameCommand(command);
        }
    }

    function logCommand(command){
        var commandName = command.getCommandName();
        var commandType = command.getCommandType();
        var parameters = command.getParameters();
        console.log({commandName: commandName, commandType: commandType, parameters: parameters});
    }

    function executeSystemCommand(command){
        command.executeCommand(navigator);
    }

    function executeGameCommand(command){
        if(commandAllowed(command)) {
            var gameNavigator = navigator.getGamesManager().getGameNavigator(command.getGameId());
            command.executeCommand(gameNavigator);
        }
    }

    function commandAllowed(command){
        var allowed = false;
        var gamesManager = navigator.getGamesManager();
        if(gamesManager.gameExists(command.getGameId())){
            allowed = true;
        }
        return allowed;
    }

    this.setNavigator = function(newNavigator){
        navigator = newNavigator;
    }
}