/**
 * Created by oteken on 6/14/2017.
 */
module.exports = function NotifyTimeLeftCommand(gameId, timeLeft) {
    var gameId = gameId;
    var timeLeft = timeLeft;
    var commandName = "TimeLeft";
    var commandType = "systemCommand";

    this.executeCommand = function (systemNavigator) {
        notificationAdapter = systemNavigator.getNotificationAdapter();
        notificationAdapter.notifyTimeLeft(gameId, timeLeft);
    }

    this.getTimeLeft = function () {
        return timeLeft;
    }

    this.getGameId = function () {
        return gameId;
    }

    this.getCommandName = function () {
        return commandName;
    }

    this.getCommandType = function () {
        return commandType;
    }

    this.getParameters = function () {
        return {gameId: gameId, timeLeft: timeLeft};
    }
}
