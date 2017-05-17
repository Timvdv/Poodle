/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function JoinCommand(player, gameId){
    var player = player;
    var gameId = gameId;

    this.executeCommand = function(gameManipulator){
        gameManipulator.addPlayer(player);
    }

    this.getPlayer = function(){
        return player;
    }
    this.getGameId = function(){
        return gameId;
    }
}