/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function StoreImageCommand(playerId, gameId, doodle){
    var playerId = playerId;
    var gameId = gameId;
    var doodle = doodle;
    var commandName = "StoreImageCommand";
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(systemNavigator){
        var imagesManager = systemNavigator.getImagesManager();
        var gameManipulator = systemNavigator.getGamesManager().getGameNavigator(gameId).getGameManipulator();

        doodleName = imagesManager.getImageName(playerId, gameId, doodle);
        imagesManager.storeImage(playerId, gameId, doodle);

        gameManipulator.setPlayerDoodleImage(playerId, doodleName);
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
        return {playerId: playerId, gameId: gameId, doodle: doodle};
    }
}