/**
 * Created by oteken on 5/11/2017.
 */
var getGameDoodlesCommandFactory = require('../GameLogic/Commands/GetGameDoodlesCommand');
var socketIdentifyCommandFactory = require('../GameLogic/Commands/SocketIdentifyCommand');

/*
 * This class is responsible for receiving requests from the websocket
 * and process this data into a command that can be executed by the system.
 */
module.exports = function SocketDataAdapter(systemConsole){

    var systemConsole = systemConsole;

    this.getGameDoodles = function(gameId, executeResponse){
        var getGameDoodlesCommand = new getGameDoodlesCommandFactory(gameId);
        systemConsole.executeCommand(getGameDoodlesCommand);
        executeResponse(getGameDoodlesCommand.getResponse());
    };

    this.identifySocketConnection = function(playerId, gameId, socketId){
        var socketIdentifyCommand = new socketIdentifyCommandFactory(playerId, gameId, socketId);
        systemConsole.executeCommand(socketIdentifyCommand);
    }
};
