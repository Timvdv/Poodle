/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function StoreImageRequestCommand(playerId, gameId, doodle){
    var playerId = playerId;
    var gameId = gameId;
    var doodle = doodle;
    var commandType = "systemCommand";
    var response = "Doodle was not allowed to be stored";
    var allowed = false;

    this.executeCommand = function(navigator){
        var imagesManager = navigator.getImagesManager();
        var allowedToStore = imagesManager.allowedToStore(playerId, gameId, doodle);
        if(allowedToStore){
            response = "Doodle was allowed to be stored."
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