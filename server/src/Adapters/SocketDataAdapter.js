/**
 * Created by oteken on 5/11/2017.
 */
var getGameDoodlesCommandFactory = require('../GameLogic/Commands/getGameDoodlesCommand');

module.exports = function SocketDataAdapter(systemConsole){

    var systemConsole = systemConsole;

    this.getGameDoodles = function(gameId){
        var getGameDoodlesCommand = new getGameDoodlesCommandFactory(gameId);
        systemConsole.executeCommand(getGameDoodlesCommand);
        return getGameDoodlesCommand.getResponse();
    }
}
