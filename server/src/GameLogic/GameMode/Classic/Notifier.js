/**
 * Created by oteken on 5/30/2017.
 */
var notifyNewPlayerCommandFactory = require('../../Commands/NotifyNewPlayerCommand');
var notifyDoodleToPlayerCommandFactory = require('../../Commands/NotifyDoodleToPlayerCommand');
var notifyGameStartedCommandFactory = require('../../Commands/NotifyGameStartedCommand');
var notifyComposePhaseStartedCommandFactory = require('../../Commands/NotifyComposePhaseStartedCommand');
var notifyToPlayerIsArtistCommandFactory = require('../../Commands/NotifyToPlayerIsArtistCommand');
var notifyTimeLeftCommandFactory = require('../../Commands/NotifyTimeLeftCommand');


module.exports = function Notifier(){
    var systemConsole;

    this.notifyNewPlayerAdded = function(player, game){
        var notifyNewPlayerCommand = new notifyNewPlayerCommandFactory(player, game);
        systemConsole.executeCommand(notifyNewPlayerCommand);
    }

    this.notifyGameStarted = function(gameId){
        var notifyGameStartedCommand = new notifyGameStartedCommandFactory(gameId);
        systemConsole.executeCommand(notifyGameStartedCommand);
    }

    this.notifyDoodleToPlayer = function(playerId, gameId, doodleName){
        var notifyDoodleToPlayerCommand = new notifyDoodleToPlayerCommandFactory(playerId, gameId, doodleName);
        systemConsole.executeCommand(notifyDoodleToPlayerCommand);
    }

    this.notifyComposePhaseStarted = function(gameId){
        var notifyComposePhaseStartedCommand = new notifyComposePhaseStartedCommandFactory(gameId);
        systemConsole.executeCommand(notifyComposePhaseStartedCommand);
    }

    this.notifyToPlayerIsArtist = function(playerId, gameId, artTitle){
        var notifyToPlayerIsArtistCommand = new notifyToPlayerIsArtistCommandFactory(playerId, gameId, artTitle);
        systemConsole.executeCommand(notifyToPlayerIsArtistCommand);
    }

    this.notifyTimeLeft = function(gameId, timeLeft){
        var notifyTimeLeftCommand = new notifyTimeLeftCommandFactory(gameId, timeLeft);
        systemConsole.executeCommand(notifyTimeLeftCommand);
    }

    this.setConsole = function(newConsole){
        systemConsole = newConsole;
    }
}