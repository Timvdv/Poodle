/**
 * Created by oteken on 5/9/2017.
 */
var joinRequestCommandFactory = require('../GameLogic/Commands/JoinRequestCommand');
var joinCommandFactory = require('../GameLogic/Commands/JoinCommand');
var createGameCommandFactory = require('../GameLogic/Commands/CreateGameCommand');
var playerFactory = require('../GameLogic/GameMode/Classic/Player');
var storeDoodleRequestCommandFactory = require('../GameLogic/Commands/StoreDoodleRequestCommand');
var storeDoodleCommandFactory = require('../GameLogic/Commands/StoreDoodleCommand');

module.exports = function RestDataAdapter(systemConsole){

    var systemConsole = systemConsole;

    this.saveDoodle = function(req, executeResponse){
        var body = req.body;
        var playerId = body.playerId;
        var gameId = body.gameId;
        var doodle = body.doodle;
        if(playerId != undefined && gameId != undefined && doodle != undefined) {
            var storeDoodleRequestCommand = new storeDoodleRequestCommandFactory(playerId, gameId, doodle);
            var storeDoodleCommand = new storeDoodleCommandFactory(playerId, gameId, doodle);
            systemConsole.executeCommand(storeDoodleRequestCommand);
            if(storeDoodleRequestCommand.getAllowed()){
                systemConsole.executeCommand(storeDoodleCommand);
            }
            executeResponse(storeDoodleRequestCommand.getResponse(), storeDoodleCommand.getResponse);
        } else {
            executeResponse("Parameters not valid");
        }
    }

    this.joinRequest = function(req, executeResponse){
        var body = req.body;
        if(body.name != undefined && body.image != undefined &&
           body.gameId != undefined) {
            var player = new playerFactory(body.name, body.image);
            var gameId = body.gameId;
            console.log("Join request, name: " + body.name + ", image:" + body.image + ", gameId:" + body.gameId);
            var joinRequestCommand = new joinRequestCommandFactory(player, gameId);
            var joinCommand = new joinCommandFactory(player, gameId);
            systemConsole.executeCommand(joinRequestCommand);
            if (joinRequestCommand.getAllowed()) {
                systemConsole.executeCommand(joinCommand);
            }
            executeResponse(joinRequestCommand.getResponse(), joinCommand.getResponse());
        } else {
            executeResponse("Parameters not valid");
        }
    }


    this.newGameCommand = function(executeResponse){
        var createGameCommand = new createGameCommandFactory();
        systemConsole.executeCommand(createGameCommand);
        executeResponse(createGameCommand.getResponse());
    }

}
