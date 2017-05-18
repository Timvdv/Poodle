/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GameManipulator(game, playerIdGenerator){
    var game = game;
    var players = game.getPlayers();
    var playerIdGenerator = playerIdGenerator;

    this.tick = function(){
        console.log("tick");
        if(currentPhaseExists()) {
            console.log(game.getCurrentPhase().getDescription());
            if (phaseTimeOver()) {
                nextPhase();
            }
        } else {
            game.setCurrentlyPlaying(false);
        }
    }

    function nextPhase(){
        game.nextPhase();
        if(currentPhaseExists()) {
            game.getCurrentPhase().setStartTime(getCurrentTimeUnixSeconds());
        }
    }

    function phaseTimeOver() {
        var currentPhase = game.getCurrentPhase();
        var endTimeForPhase = currentPhase.getStartTime() + currentPhase.getDurationTime();
        return endTimeForPhase <= getCurrentTimeUnixSeconds() ? true : false;
    }

    function currentPhaseExists(){
        return game.getCurrentPhaseIndex() >= game.getPhases().length ? false : true;
    }

    this.startGame = function(){
        startInitialPhase();
    }
    function startInitialPhase(){
        game.getPhases()[0].setStartTime(getCurrentTimeUnixSeconds());
        game.setCurrentlyPlaying(true);
    }

    this.endGame = function(){
        game.setCurrentlyPlaying(false);
    }

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

    this.generateUniqueId = function(){
        return playerIdGenerator.generateUniqueId();
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

    function getCurrentTimeUnixSeconds(){
        var time = Math.floor(new Date() / 1000);
        return time;
    }
}