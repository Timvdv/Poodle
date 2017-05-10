/**
 * Created by oteken on 5/9/2017.
 */

function Game(){
    var players = [];

    this.addPlayer = function addPlayer(player){
        if(player instanceof Player) {
            this.players.push()
        }
    }

    this.getPlayers = function getPlayers(){
        return players;
    }
}