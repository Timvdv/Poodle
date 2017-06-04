/**
 * Created by oteken on 5/30/2017.
 */
var notifyNewPlayerCommandFactory = require('../../Commands/NotifyNewPlayerCommand');
var notifyDoodleToPlayerCommandFactory = require('../../Commands/NotifyDoodleToPlayerCommand');

module.exports = function Notifier(){
    var systemConsole;

    this.notifyNewPlayerAdded = function(player, game){
        var notifyNewPlayerCommand = new notifyNewPlayerCommandFactory(player, game);
        systemConsole.executeCommand(notifyNewPlayerCommand);
    }

    this.notifyDoodleToPlayer = function(playerId, gameId, doodleName){
        var notifyDoodleToPlayerCommand = new notifyDoodleToPlayerCommandFactory(playerId, gameId, doodleName);
        systemConsole.executeCommand(notifyDoodleToPlayerCommand);
    }

    this.setConsole = function(newConsole){
        systemConsole = newConsole;
    }
}