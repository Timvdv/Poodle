/**
 * Created by oteken on 5/11/2017.
 */
var getGameDoodlesCommandFactory = require('../GameLogic/Commands/GetGameDoodlesCommand');
var socketIdentifyCommandFactory = require('../GameLogic/Commands/SocketIdentifyCommand');
var startGameCommandFactory = require('../GameLogic/Commands/StartGameCommand');
var startGameRequestCommandFactory = require('../GameLogic/Commands/StartGameRequestCommand');

/*
 * This class is responsible for receiving requests from the websocket
 * and process this data into a command that can be executed by the system.
 */
module.exports = function SocketDataAdapter(systemConsole){

    var systemConsole = systemConsole;

    this.identifySocketConnection = function(playerId, gameId, socketId){
        var socketIdentifyCommand = new socketIdentifyCommandFactory(playerId, gameId, socketId);
        systemConsole.executeCommand(socketIdentifyCommand);
    }

    this.startGameRequest = function(gameId, executeResponse){
        if(!(gameId == undefined)){
            var startGameRequestCommand = new startGameRequestCommandFactory(gameId);
            systemConsole.executeCommand(startGameRequestCommand);
            if(startGameRequestCommand.getAllowed()){
                var startGameCommand = new startGameCommandFactory(gameId);
                systemConsole.executeCommand(startGameCommand);
                return {response: startGameRequestCommand.getResponse()};
            } else {
                return {response: "Game was not allowed to be started."};
            }
        } else {
            return {response: "Parameters not valid"};
        }
    }

    this.getGameDoodles = function(gameId){
        var getGameDoodlesCommand = new getGameDoodlesCommandFactory(gameId);
        systemConsole.executeCommand(getGameDoodlesCommand);
        return getGameDoodlesCommand.getResponse();
    }
}
