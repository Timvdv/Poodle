/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function GetGameDoodlesCommand(gameId){
    var gameId = gameId;
    var response = {};
    var commandType = "gameCommand";

    this.executeCommand = function(gameManipulator){
        var doodles = gameManipulator.getDoodles();
        var doodleUrls = [];
        for (var i = 0; i < doodles.length; i++) {
            console.log('url = ' + doodles[i].getImage());
            doodleUrls.push(doodles[i].getImage());
        }
        response = {gameId: gameManipulator.getGameId(), doodleUrls: doodleUrls};
    }

    this.getResponse = function(){
        return response;
    }

    this.getGameId = function(){
        return gameId;
    }
    this.getCommandType = function(){
        return commandType;
    }
}