/**
 * Created by oteken on 5/9/2017.
 */
var joinRequestCommandFactory = require('../GameLogic/Commands/JoinRequestCommand');
var joinCommandFactory = require('../GameLogic/Commands/JoinCommand');
var createGameCommandFactory = require('../GameLogic/Commands/CreateGameCommand');
var playerFactory = require('../GameLogic/GameMode/Classic/Player');
var storeImageRequestCommandFactory = require('../GameLogic/Commands/StoreImageRequestCommand');
var storeImageCommandFactory = require('../GameLogic/Commands/StoreImageCommand');

module.exports = function RestDataAdapter(console){

    var console = console;

    this.saveImage = function(req, executeResponse){
        var body = req.body;
        var playerId = body.playerId;
        var gameId = body.gameId;
        var image = body.image;
        if(playerId != undefined && gameId != undefined && image != undefined) {
            var storeImageRequestCommand = new storeImageRequestCommandFactory(playerId, gameId, image);
            var storeImageCommand = new storeImageCommandFactory(playerId, gameId, image);
            console.executeCommand(storeImageRequestCommand);
            if(storeImageRequestCommand.getAllowed()){
                console.executeCommand(storeImageCommand);
            }
            executeResponse(storeImageRequestCommand.getResponse(), storeImageCommand.getResponse);
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
            var joinRequestCommand = new joinRequestCommandFactory(player, gameId);
            var joinCommand = new joinCommandFactory(player, gameId);
            console.executeCommand(joinRequestCommand);
            if (joinRequestCommand.getAllowed()) {
                console.executeCommand(joinCommand);
            }
            executeResponse(joinRequestCommand.getResponse(), joinCommand.getResponse());
        } else {
            executeResponse("Parameters not valid");
        }
    }

    this.newGameCommand = function(executeResponse){
        var createGameCommand = new createGameCommandFactory();
        console.executeCommand(createGameCommand);
        executeResponse(createGameCommand.getResponse());
    }

}