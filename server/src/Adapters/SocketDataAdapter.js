/**
 * Created by oteken on 5/11/2017.
 */
var getGameDoodlesCommandFactory = require('../GameLogic/Commands/GetGameDoodlesCommand');
var socketIdentifyCommandFactory = require('../GameLogic/Commands/SocketIdentifyCommand');
var startGameCommandFactory = require('../GameLogic/Commands/StartGameCommand');
var startGameRequestCommandFactory = require('../GameLogic/Commands/StartGameRequestCommand');
var getPlayerDoodleNameCommandFactory = require('../GameLogic/Commands/GetPlayerDoodleNameCommand');

/*
 * This class is responsible for receiving requests from the websocket
 * and process this data into a command that can be executed by the system.
 */
module.exports = function SocketDataAdapter(systemConsole, socketConnectionManager){
    var systemConsole = systemConsole;
    var socketConnectionManager = socketConnectionManager;

    this.identifySocketConnection = function(playerId, gameId, socketId){
        var socketIdentifyCommand = new socketIdentifyCommandFactory(playerId, gameId, socketId);
        systemConsole.executeCommand(socketIdentifyCommand);
    }

    this.startGameRequest = function(socketId){
        var gameId = socketConnectionManager.getGameIdFromSocketId(socketId);
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

    this.notifyDoodleToPlayer = function(socketId){
        var playerId = socketConnectionManager.getPlayerIdFromSocketId(socketId);
        var gameId = socketConnectionManager.getGameIdFromSocketId(socketId);
        var getPlayerDoodleNameCommand = new getPlayerDoodleNameCommandFactory(playerId, gameId);
        systemConsole.executeCommand(getPlayerDoodleNameCommand);
    }

    this.getGameDoodles = function(socketId){
        var gameId = socketConnectionManager.getGameIdFromSocketId(socketId);
        if (gameId){
            var getGameDoodlesCommand = new getGameDoodlesCommandFactory(gameId);
            systemConsole.executeCommand(getGameDoodlesCommand);
            console.log(getGameDoodlesCommand.getResponse().doodleUrls);
            return getGameDoodlesCommand.getResponse();
        }
    }
    return "Wrong parameters";
}
