/**
 * Created by oteken on 5/27/2017.
 */

module.exports = function GameCreator(idGenerator){
    var gameManipulatorFactory = require('./GameMode/Classic/GameManipulator');
    var gameFactory = require('./GameMode/Classic/Game');
    var playerIdGeneratorFactory = require('./IdGenerator');
    var phaseFactory = require('./GameMode/Classic/Phase');
    var gameRunnerFactory = require('./GameMode/Classic/GameRunner');
    var idGenerator = idGenerator;


    this.createNewGame = function(){
        var gameId = idGenerator.generateUniqueId();
        var gameManipulator = createDefaultGame(gameId);
        return gameManipulator;
    }

    createDefaultGame = function(gameId){
        var phase1 = new phaseFactory("Phase one", 10);
        var phase2 = new phaseFactory("Phase two", 5);
        var phases = [phase1, phase2];
        var game = new gameFactory(gameId, 2, phases);
        var playerIdGenerator = new playerIdGeneratorFactory();
        var gameManipulator = new gameManipulatorFactory(game, playerIdGenerator);
        var gameRunner = new gameRunnerFactory(gameManipulator);
        gameManipulator.setGameRunner(gameRunner);
        return gameManipulator;
    }
}