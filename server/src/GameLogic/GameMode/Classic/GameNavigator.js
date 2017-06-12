/**
 * Created by oteken on 6/11/2017.
 */
module.exports = function GameNavigator(gameManipulator, game, idGenerator, notifier, gameRunner) {
    var gameManipulator = gameManipulator;
    var game = game;
    var idGenerator = idGenerator;
    var notifier = notifier;
    var gameRunner = gameRunner;

    this.getGameManipulator = function(){
        return gameManipulator;
    }

    this.getGame = function(){
        return game;
    }

    this.getIdGenerator = function(){
        return idGenerator;
    }

    this.getGameRunner = function(){
        return gameRunner;
    }

    this.getNotifier = function(){
        return notifier;
    }
}