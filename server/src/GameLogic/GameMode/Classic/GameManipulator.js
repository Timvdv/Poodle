/**
 * Created by oteken on 5/16/2017.
 */
var doodleFactory = require('./Doodle');

module.exports = function GameManipulator(){
    var gameNavigator;
    var game;
    var players;
    var idGenerator;
    var gameRunner;
    var notifier;

    var distributedElements = false;

    this.setGameNavigatorAndGetDependencies = function(navigator){
        gameNavigator = navigator;
        getDependentObjects();
    }

    function getDependentObjects(){
        game = gameNavigator.getGame();
        players = game.getPlayers();
        idGenerator = gameNavigator.getIdGenerator();
        gameRunner = gameNavigator.getGameRunner();
        notifier = gameNavigator.getNotifier();
    }

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
        notifier.notifyGameStarted(game.getGameId());
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
        distributeScenarioElementsToPlayers();
    }

    function notifyNewPlayerAdded(player){
        notifier.notifyNewPlayerAdded(player, game);
    }

    this.notifyDoodleToPlayer = function(playerId){
        var player = getPlayer(playerId);
        notifier.notifyDoodleToPlayer(playerId, game.getGameId(), player.getDoodle().getName());
    }

    function distributeScenarioElementsToPlayers(){
        console.log("disting");
        var scenarioElements = game.getScenario().getElements();
        var doodle;
        for (var i = 0; i < players.length; i++) {
            doodle = createDoodleFromScenarioElement(scenarioElements[i]);
            players[i].setDoodle(doodle);
        }
        distributedElements = true;
    }

    function createDoodleFromScenarioElement(element){
        var name = element.getName();
        var priority = element.getPriority();
        var layer = element.getLayer();
        var doodle = new doodleFactory(name, priority, layer);
        return doodle;
    }

    this.allowedToJoin = function(player){
        if(maximumPlayersReached()) {
            return false;
        }
        return true;
    }

    function maximumPlayersReached(){
        return (players.length >= game.getMaximumPlayers());
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

    function getCurrentTimeUnixSeconds(){
        var time = Math.floor(new Date() / 1000);
        return time;
    }

    this.getDoodles = function() {
        var gameDoodles = [];
        console.log('len = ' + players.length);
        for (var i = 0; i < players.length; i++) {
            if(players[i].getDoodle() != undefined)
                gameDoodles.push(players[i].getDoodle());
        }
        return gameDoodles;
    }

    this.getPlayerDoodleName = function(playerId){
        var doodle = getPlayer(playerId).getDoodle();
        return doodle.getName();
    }

    this.setPlayerDoodleImage = function(playerId, doodle){
        var player = getPlayer(playerId);
        if(player != undefined){
            player.getDoodle().setImage(doodle);
        }
    }

    this.playerExists = function(playerId){
        var player = getPlayer(playerId);
        if(player == undefined)
            return false
        return true;
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