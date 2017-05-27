/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function JoinCommand(player, gameId){
    var player = player;
    var gameId = gameId;
    var response = {};
    var commandType = "gameCommand";

    this.executeCommand = function(gameManipulator){
        var playerId = gameManipulator.generateUniqueId();
        player.setId(playerId);
        gameManipulator.addPlayer(player);
        response = player.getJsonRepresentation();
    }

    this.getResponse = function(){
        return response;
    }

    this.getPlayer = function(){
        return player;
    }
    this.getGameId = function(){
        return gameId;
    }
    this.getCommandType = function(){
        return commandType;
    }
}