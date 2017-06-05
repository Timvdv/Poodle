/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function NotifyDoodleToPlayerCommand(playerId, gameId, doodleName){
    var playerId = playerId;
    var gameId = gameId;
    var doodleName = doodleName;
    var commandType = "systemCommand";

    this.executeCommand = function(navigator){
        notificationAdapter = navigator.getNotificationAdapter();
        notificationAdapter.notifyDoodleToPlayer(playerId, gameId, doodleName);
    }

    this.getCommandType = function(){
        return commandType;
    }
}