/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function JoinCommand(player, gameId){
    var player = player;
    var gameId = gameId;
    var commandName = "JoinCommand";
    var commandType = "gameCommand";
    var response = {};

    this.executeCommand = function(gameNavigator){
        var gameManipulator = gameNavigator.getGameManipulator();
        var playerId = gameManipulator.generateUniqueId();
        player.setId(playerId);
        gameManipulator.addPlayer(player);
        response = player.getJsonRepresentation();
    }

    this.getPlayer = function(){
        return player;
    }

    this.getGameId = function(){
        return gameId;
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }

    this.getParameters = function(){
        return {player: player, gameId: gameId};
    }
}