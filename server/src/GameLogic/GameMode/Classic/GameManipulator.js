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
    var artistPlayer;

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
        console.log("Tick : " + getCurrentPhaseDescription());
        if(!currentPhaseExists()){
            game.setCurrentlyPlaying(false);
            return;
        }
        if(getCurrentPhaseDescription() == "Phase one"){
            phaseOneTick();
        } else if(getCurrentPhaseDescription() == "Phase two"){
            phaseTwoTick();
        } else if(getCurrentPhaseDescription() == "Phase three"){
            phaseThreeTick();
        }
    }

    function phaseOneTick(){
        var gameId = game.getGameId();
        var timeLeft = phaseTimeLeft();
        notifier.notifyTimeLeft(gameId, timeLeft);
        if(phaseTimeOver() || allDoodlesSubmitted()){
            var playerId = artistPlayer.getId();
            var artTitle = game.getScenario().getPaintingName();
            notifier.notifyToPlayerIsArtist(playerId, gameId, artTitle);
            notifier.notifyComposePhaseStarted(game.getGameId());
            nextPhase();
        }
    }

    function phaseTwoTick(){
        var gameId = game.getGameId();
        var timeLeft = phaseTimeLeft();
        notifier.notifyTimeLeft(gameId, timeLeft);
        if(phaseTimeOver()){
            nextPhase();
        }
    }

    function phaseThreeTick(){

    }

    function nextPhase(){
        game.nextPhase();
        if(currentPhaseExists()) {
            game.getCurrentPhase().setStartTime(getCurrentTimeUnixSeconds());
        }
    }

    function getCurrentPhaseDescription(){
        return game.getCurrentPhase().getDescription();
    }

    function phaseTimeOver(){
        var currentPhase = game.getCurrentPhase();
        var endTimeForPhase = currentPhase.getStartTime() + currentPhase.getDurationTime();
        return endTimeForPhase <= getCurrentTimeUnixSeconds() ? true : false;
    }

    function phaseTimeLeft(){
        var currentPhase = game.getCurrentPhase();
        var endTimeForPhase = currentPhase.getStartTime() + currentPhase.getDurationTime();
        return (endTimeForPhase - getCurrentTimeUnixSeconds());
    }

    function allDoodlesSubmitted(){
        var allDoodlesSubmitted = true;
        var doodles = getDoodles();
        for (var i = 0; i < doodles.length; i++) {
            var doodleImage = doodles[i].getImage();
            if(!doodleImage)
                allDoodlesSubmitted = false;
        }
        return allDoodlesSubmitted;
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
        chooseArtist();
    }

    function notifyNewPlayerAdded(player){
        notifier.notifyNewPlayerAdded(player, game);
    }

    this.notifyDoodleToPlayer = function(playerId){
        var player = getPlayer(playerId);
        notifier.notifyDoodleToPlayer(playerId, game.getGameId(), player.getDoodle().getName());
    }

    function chooseArtist(){
        artistPlayer = players[players.length-1];
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
        for (var i = 0; i < players.length; i++) {
            if(players[i].getDoodle()) {
                gameDoodles.push(players[i].getDoodle());
            }
        }
        return gameDoodles;
    }

    function getDoodles() {
        var gameDoodles = [];
        for (var i = 0; i < players.length; i++) {
            if(players[i].getDoodle()) {
                gameDoodles.push(players[i].getDoodle());
            }
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