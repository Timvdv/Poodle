/**
 * Created by oteken on 5/30/2017.
 */
module.exports = function NotifyNewPlayerCommand(playerId, gameId){
    var commandName = "NotifyNewPlayerCommand";
    var commandType = "systemCommand";

    this.executeCommand = function(systemNavigator){
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyNewPlayerAdded(playerId, gameId);
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getParameters = function(){
        return {};
    }
}