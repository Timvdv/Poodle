/**
 * Created by oteken on 5/18/2017.
 */
module.exports = function GameRunner(){
    var gameNavigator;
    var gameManipulator;
    var game;
    var tickTime = 1000;

    this.setGameNavigatorAndGetDependencies = function(navigator){
        gameNavigator = navigator;
        getDependentObjects();
    }

    function getDependentObjects(){
        gameManipulator = gameNavigator.getGameManipulator();
        game = gameNavigator.getGame();
    }

    this.startGame = function(){
        gameManipulator.startGame();
        setTimeout(tick, tickTime);
    }
    this.endGame = function(){
        gameManipulator.endGame();
    }

    function tick(){
        gameManipulator.tick();
        if(game.getCurrentlyPlaying()){
            setTimeout(tick, tickTime);
        }
    }
}