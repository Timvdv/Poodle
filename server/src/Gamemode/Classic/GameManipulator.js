/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GameManipulator(game){
    var game = game;
    var players = game.getPlayers();

    this.addPlayer = function(player){
        players.push(player);
    }

    this.addDoodleToPlayer = function(doodle, id){
        var player = findPlayer(id);
        player.setDoodle(doodle);
    }

    this.allowedToJoin = function(player){
        if(maximumPlayersReached()) {
            return false;
        }
        return true;
    }

    function maximumPlayersReached(){
        return (game.getMaximumPlayers() < players.length);
    }

    function findPlayer(id){
        for (var i = 0; i < players.length; i++) {
            if(players[i].getId() == id){
                return players[i];
            }
        }
        return 0;
    }

    this.getGame = function (){
        return game;
    }

    this.getGameId = function(){
        return game.getGameId();
    }

}