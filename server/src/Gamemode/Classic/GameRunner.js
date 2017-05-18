/**
 * Created by oteken on 5/18/2017.
 */
module.exports = function GameRunner(gameManipulator){

    var gameManipulator = gameManipulator;
    var tickTime = 1000;

    this.startGame = function(){
        gameManipulator.startGame();
        setTimeout(tick, tickTime);
    }
    this.endGame = function(){
        gameManipulator.endGame();
    }

    function tick(){
        gameManipulator.tick();
        if(gameManipulator.getGame().getCurrentlyPlaying()){
            setTimeout(tick, tickTime);
        }
    }

    this.getGameId = function(){
        return gameManipulator.getGameId();
    }

}