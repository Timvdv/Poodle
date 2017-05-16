/**
 * Created by oteken on 5/9/2017.
 */
var joinRequestCommandFactory = require('../GameLogic/JoinRequestCommand');
var joinCommandFactory = require('../GameLogic/JoinCommand');
var playerFactory = require('../Gamemode/Classic/Player');


module.exports = function RestDataAdapter(gameManager){

    var gameManager = gameManager;

    this.addData = function(data, executeResponse){
        holdingData.push(data);
        console.log("added: " + data);
        console.log("now: " + holdingData);
        executeResponse();
    }

    this.joinRequest = function(req, executeResponse){
        var body = req.body;
        var player = new playerFactory(body.name, body.image, body.playerId);
        var gameId = body.gameId;
        var joinRequestCommand = new joinRequestCommandFactory(player, gameId);
        gameManager.executeCommand(joinRequestCommand);
        if(joinRequestCommand.getAllowed()){
            var joinCommand = new joinCommandFactory(player, gameId);
            gameManager.executeCommand(joinCommand);
        }
        executeResponse(joinRequestCommand.getResponse());
    }

    this.getData = function(){
        return holdingData;
    }
}