/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function GetGameDoodlesCommand(gameId){
    var gameId = gameId;
    var commandName = "GetGameDoodlesCommand";
    var commandType = "gameCommand";
    var response = {};

    this.executeCommand = function(gameNavigator){
        var gameManipulator = gameNavigator.getGameManipulator()
        var doodles = gameManipulator.getDoodles();
        var doodleData = [];
        console.log("The doodles are : " + doodles);
        for (var i = 0; i < doodles.length; i++) {
            console.log('url = ' + doodles[i].getImage());
            doodleData.push({id: i + 1, x: i*10, y: i*10, url: doodles[i].getImage() + '.png'});
        }
        response = doodleData;
    }

    this.getGameId = function(){
        return gameId;
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
        return {gameId: gameId};
    }
}