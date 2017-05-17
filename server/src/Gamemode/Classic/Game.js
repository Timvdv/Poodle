/**
 * Created by oteken on 5/9/2017.
 */

module.exports = function Game(gameId, maximumPlayers){
    var gameId = gameId;
    var players = [];
    var maximumPlayers = maximumPlayers;

    this.getGameId = function(){
        return gameId;
    }

    this.getPlayers = function(){
        return players;
    }

    this.getMaximumPlayers = function(){
        return maximumPlayers;
    }
}