/**
 * Created by oteken on 5/28/2017.
 */
module.exports = function NotificationAdapter(socketConnection){

    this.notifyNewPlayerAdded = function(player, game){
        var data = {playerId : player.getId(), playerName: player.getName(), gameId: game.getGameId()};
        var eventName = "playerJoined"
        socketConnection.notify(eventName, data);
    }
}