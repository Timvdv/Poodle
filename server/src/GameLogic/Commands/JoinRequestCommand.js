/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function JoinRequestCommand(player, gameId){
    var player = player;
    var gameId = gameId;
    var response = "Player was not allowed to join.";
    var allowed = false;
    var commandType = "gameCommand";

    this.executeCommand = function(gameManipulator){
        console.log("allowed to game = " + gameManipulator.allowedToJoin(player))
        if(gameManipulator.allowedToJoin(player)){
            response = "Player was allowed to join.";
            allowed = true;
        }
    }

    this.getAllowed = function(){
        return allowed;
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
