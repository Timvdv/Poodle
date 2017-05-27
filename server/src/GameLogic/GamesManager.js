/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GamesManager(gameCreator){

    var gameCreator = gameCreator;
    var gameManipulators = [];

    this.addGameManipulator = function(gameManipulator){
        gameManipulators.push(gameManipulator);
    }

    this.getGameManipulator = function (gameId){
        for (var i = 0; i < gameManipulators.length; i++) {
            if(gameId == gameManipulators[i].getGameId()){
                return gameManipulators[i];
            }
        }
        return undefined;
    }

    this.gameExists = function (gameId){
        for (var i = 0; i < gameManipulators.length; i++) {
            if(gameId == gameManipulators[i].getGameId()){
                return true;
            }
        }
        return false;
    }

    this.getGameCreator = function(){
        return gameCreator;
    }
}