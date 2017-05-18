/**
 * Created by oteken on 5/18/2017.
 */
module.exports = function startGameCommand(gameId){
    var gameId = gameId;

    this.executeCommand = function(gamesManager){
        gamesManager.startGame(gameId);
    }

    this.getGameId = function(){
        return gameId;
    }
}