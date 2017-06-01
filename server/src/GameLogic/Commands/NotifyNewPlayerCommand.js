/**
 * Created by oteken on 5/30/2017.
 */
module.exports = function NotifyNewPlayerCommand(playerId, gameId){
    var commandType = "systemCommand";

    this.executeCommand = function(navigator){
        notificationAdapter = navigator.getNotificationAdapter();
        notificationAdapter.notifyNewPlayerAdded(playerId, gameId);
    }

    this.getCommandType = function(){
        return commandType;
    }
}