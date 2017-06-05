/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function StoreImageCommand(playerId, gameId, doodle){
    var playerId = playerId;
    var gameId = gameId;
    var doodle = doodle;
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(navigator){
        var imagesManager = navigator.getImagesManager();
        var gameManipulator = navigator.getGamesManager().getGameManipulator(gameId);

        doodleName = imagesManager.getImageName(playerId, gameId, doodle);
        imagesManager.storeImage(playerId, gameId, doodle);

        gameManipulator.setPlayerDoodleImage(playerId, doodleName);
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }
}