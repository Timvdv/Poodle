/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GameManipulator(game, idGenerator, notifier){
    var game = game;
    var players = game.getPlayers();
    var idGenerator = idGenerator;
    var gameRunner;
    var notifier = notifier

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
        notifyNewPlayerAdded(player);
    }

    function notifyNewPlayerAdded(player){
        notifier.notifyNewPlayerAdded(player, game);
    }

    this.addDoodleToPlayer = function(doodle, id){
        var player = findPlayer(id);
        player.setDoodle(doodle);
    }

    this.allowedToJoin = function(player){
        console.log(maximumPlayersReached());
        if(maximumPlayersReached()) {
            return false;
        }
        return true;
    }

    function maximumPlayersReached(){
        return (game.getMaximumPlayers() < players.length);
    }

    this.generateUniqueId = function(){
        return idGenerator.generateUniqueId();
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

    this.setGameRunner = function(newGameRunner){
        gameRunner = newGameRunner;
    }
    this.getGameRunner = function(){
        return gameRunner;
    }

    this.getNotifier = function(){
        return notifier;
    }

    function getCurrentTimeUnixSeconds(){
        var time = Math.floor(new Date() / 1000);
        return time;
    }

    this.getDoodles = function() {
        var gameDoodles = [];
        for (var i = 0; i < players.length; i++) {
            if(players[i].getDoodle() != undefined)
                gameDoodles += {playerId: players[i].getId(), url: players[i].getDoodle()};
        }
        return gameDoodles;
    }

    this.setPlayerDoodle = function(playerId, doodle){
        var player = getPlayer(playerId);
        if(player != undefined){
            player.setDoodle(doodle);
        }
    }

    function getPlayer(playerId){
        for (var i = 0; i < players.length; i++) {
            if(playerId == players[i].getId()){
                return players[i];
            }
        }
        return undefined;
    }
}