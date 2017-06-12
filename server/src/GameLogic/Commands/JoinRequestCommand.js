/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function JoinRequestCommand(player, gameId){
    var player = player;
    var gameId = gameId;
    var allowed = false;
    var commandName = "JoinRequestCommand";
    var commandType = "gameCommand";
    var response = "Player was not allowed to join.";

    this.executeCommand = function(gameNavigator){
        var gameManipulator = gameNavigator.getGameManipulator()
        console.log("allowed to game = " + gameManipulator.allowedToJoin(player))
        if(gameManipulator.allowedToJoin(player)){
            response = "Player was allowed to join.";
            allowed = true;
        }
    }

    this.getPlayer = function(){
        return player;
    }

    this.getGameId = function(){
        return gameId;
    }

    this.getAllowed = function(){
        return allowed;
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
        return {player: player, gameId: gameId, allowed: allowed};
    }
}
