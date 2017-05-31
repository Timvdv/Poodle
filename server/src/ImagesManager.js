/**
 * Created by oteken on 5/31/2017.
 */
module.exports = function ImagesManager(imageWriter){

    var imageWriter = imageWriter;
    var maximumNameLength = 22;
    var minimumNameLength = 22;

    this.getImageName = function(playerId, gameId, rawImage){
        var name = evaluateName(playerId, gameId);
        return name;
    }

    this.allowedToStore = function(playerId, gameId, rawImage){
        if(playerId != null && gameId != null && rawImage != null){
            var name = evaluateName(playerId, gameId);
            if(!nameTooLong(name) && !nameTooShort(name))
                return true;
        }
        return false
    }

    function evaluateName(playerId, gameId){
        var name = "";
        var playerField = "playerId" + playerId;
        var gameField = "gameId" + gameId;
        name += playerField;
        name += gameField;
        return name;
    }

    function nameTooLong(name){
        if(name.length <= maximumNameLength)
            return false;
        return true;
    }

    function nameTooShort(name){
        if(name.length >= minimumNameLength)
            return false;
        return true;
    }

    this.storeImage = function(playerId, gameId, rawImage){
        var name = evaluateName(playerId, gameId);
        imageWriter.storeRawImageAsPNG(name, rawImage);
    }
}