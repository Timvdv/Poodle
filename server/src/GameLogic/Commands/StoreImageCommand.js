/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function StoreImageCommand(playerId, gameId, image){
    var playerId = playerId;
    var gameId = gameId;
    var image = image;
    var commandType = "systemCommand";
    var response = {};

    this.executeCommand = function(navigator){
        var imagesManager = navigator.getImagesManager();
        imageName = imagesManager.getImageName(playerId, gameId, image);
        imagesManager.storeImage(playerId, gameId, image);
        response = {imageName: imageName};
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }
}