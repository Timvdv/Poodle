/**
 * Created by oteken on 6/12/2017.
 */
module.exports = function NotifyComposePhaseStartedCommand(gameId) {
    var commandName = "NotifyComposePhaseStartedCommand";
    var commandType = "systemCommand";

    this.executeCommand = function (systemNavigator) {
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyComposePhaseStarted(gameId);
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function () {
        return commandType;
    }

    this.getParameters = function(){
        return {gameId: gameId};
    }
}