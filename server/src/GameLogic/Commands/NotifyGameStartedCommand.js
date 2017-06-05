/**
 * Created by oteken on 6/5/2017.
 */
module.exports = function NotifyGameStarted (gameId) {
    var commandType = "systemCommand";

    this.executeCommand = function (navigator) {
        notificationAdapter = navigator.getNotificationAdapter();
        notificationAdapter.notifyNewPlayerAdded(playerId, gameId);
    }

    this.getCommandType = function () {
        return commandType;
    }
}