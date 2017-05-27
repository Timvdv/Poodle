/**
 * Created by oteken on 5/16/2017.
 */
module.exports = function GamesManager(gameManipulator, gameRunner){

    var gameManipulators = [];
    gameManipulators.push(gameManipulator);
    var gameRunners = [];
    gameRunners.push(gameRunner)



    this.getGameRunner = function(gameId){
        for (var i = 0; i < gameRunners.length; i++) {
            console.log(i);
            if(gameId == gameRunners[i].getGameId()){
                return gameRunners[i];
            }
        }
        return undefined;
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
}