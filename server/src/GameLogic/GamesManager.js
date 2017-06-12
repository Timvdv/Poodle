/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GamesManager(gameCreator){

    var gameCreator = gameCreator;
    var gameNavigators = [];

    this.addGameNavigator = function(gameNavigator){
        gameNavigators.push(gameNavigator);
    }

    this.getGameNavigator = function (gameId){
        for (var i = 0; i < gameNavigators.length; i++) {
            if(gameId == gameNavigators[i].getGame().getGameId()){
                return gameNavigators[i];
            }
        }
        return undefined;
    }

    this.gameExists = function (gameId){
        for (var i = 0; i < gameNavigators.length; i++) {
            if(gameId == gameNavigators[i].getGame().getGameId()){
                return true;
            }
        }
        return false;
    }

    this.getGameCreator = function(){
        return gameCreator;
    }
}