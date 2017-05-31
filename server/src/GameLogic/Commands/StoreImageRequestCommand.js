/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function StoreImageRequestCommand(playerId, gameId, image){
    var playerId = playerId;
    var gameId = gameId;
    var image = image;
    var commandType = "systemCommand";
    var response = "Image was not allowed to be stored";
    var allowed = false;

    this.executeCommand = function(navigator){
        var imagesManager = navigator.getImagesManager();
        var allowedToStore = imagesManager.allowedToStore(playerId, gameId, image);
        if(allowedToStore){
            response = "Image was allowed to be stored."
            allowed = true;
        }
    }

    this.getCommandType = function(){
        return commandType;
    }

    this.getResponse = function(){
        return response;
    }

    this.getAllowed = function(){
        return allowed;
    }
}