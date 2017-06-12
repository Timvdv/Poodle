/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function StoreImageRequestCommand(playerId, gameId, doodle){
    var playerId = playerId;
    var gameId = gameId;
    var doodle = doodle;
    var allowed = false;
    var commandName = "StoreImageRequestCommand";
    var commandType = "systemCommand";
    var response = "Doodle was not allowed to be stored";

    this.executeCommand = function(systemNavigator){
        var imagesManager = systemNavigator.getImagesManager();
        var gamesManager = systemNavigator.getGamesManager();

        var allowedToStoreImage = imagesManager.allowedToStore(playerId, gameId, doodle);
        var gameExists = gamesManager.gameExists(gameId);
        var playerExists = false;

        if(gameExists) {
            var gameNavigator = gamesManager.getGameNavigator(gameId);
            var gameManipulator = gameNavigator.getGameManipulator();
            playerExists = gameManipulator.playerExists(playerId);
        }

        if(allowedToStoreImage && gameExists && playerExists){
            response = "Doodle was allowed to be stored."
            allowed = true;
        }
    }

    this.getAllowed = function(){
        return allowed;
    }

    this.getCommandName = function(){
        return commandName;
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }

    this.getParameters = function(){
        return {playerId: playerId, gameId: gameId, doodle: doodle, allowed: allowed};
    }
}