/**
 * Created by oteken on 5/9/2017.
 */

module.exports = function Game(gameId, maximumPlayers, phases){
    var gameId = gameId;
    var players = [];
    var maximumPlayers = maximumPlayers;
    var phases = phases;
    var currentPhaseIndex = 0;
    var currentlyPlaying = false;

    this.getGameId = function(){
        return gameId;
    }

    this.getPlayers = function(){
        return players;
    }

    this.getMaximumPlayers = function(){
        return maximumPlayers;
    }

    this.getPhases = function(){
        return phases;
    }
    this.getCurrentPhaseIndex = function(){
        return currentPhaseIndex;
    }
    this.getCurrentPhase = function(){
        return phases[currentPhaseIndex];
    }
    this.nextPhase = function(){
        currentPhaseIndex++;
    }

    this.getCurrentlyPlaying = function(){
        return currentlyPlaying;
    }
    this.setCurrentlyPlaying = function(playingStatus){
        currentlyPlaying = playingStatus;
    }

}