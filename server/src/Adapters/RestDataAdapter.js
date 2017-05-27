/**
 * Created by oteken on 5/9/2017.
 */

/**

 */
var joinRequestCommandFactory = require('../GameLogic/Commands/JoinRequestCommand');
var joinCommandFactory = require('../GameLogic/Commands/JoinCommand');
var playerFactory = require('../GameLogic/GameMode/Classic/Player');
module.exports = function RestDataAdapter(gameManager){

    var gameManager = gameManager;

    this.addData = function(data, executeResponse){
        holdingData.push(data);
        console.log("added: " + data);
        console.log("now: " + holdingData);
        executeResponse();
    }

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
            gameManager.executeCommand(joinRequestCommand);
            if (joinRequestCommand.getAllowed()) {
                gameManager.executeCommand(joinCommand);
            }
            executeResponse(joinRequestCommand.getResponse(), joinCommand.getResponse());
        } else {
            executeResponse("Parameters not valid");
        }
    }

    this.getData = function(){
        return holdingData;
    }
}