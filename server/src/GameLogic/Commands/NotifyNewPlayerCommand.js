/**
 * Created by oteken on 5/30/2017.
 */
module.exports = function NotifyNewPlayerCommand(player, game){
    var commandType = "systemCommand";

    this.executeCommand = function(navigator){
        notificationAdapter = navigator.getNotificationAdapter();
        notificationAdapter.notifyNewPlayerAdded(player, game);
    }

    this.getCommandType = function(){
        return commandType;
    }
}