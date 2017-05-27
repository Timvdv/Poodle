/**
 * Created by oteken on 5/9/2017.
 */

var joinRequestCommandFactory = require('../GameLogic/Commands/JoinRequestCommand');
var joinCommandFactory = require('../GameLogic/Commands/JoinCommand');
var createGameCommandFactory = require('../GameLogic/Commands/CreateGameCommand');
var playerFactory = require('../GameLogic/GameMode/Classic/Player');

module.exports = function RestDataAdapter(SystemConsole){

    var systemConsole = SystemConsole;

    this.saveImageRequest = function(req, executeResponse){
        executeResponse();
    }

    this.joinRequest = function(req, executeResponse){
        var body = req.body;
        if(body.name != undefined && body.image != undefined &&
           body.gameId != undefined) {
            var player = new playerFactory(body.name, body.image);
            var gameId = body.gameId;
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