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
    var notifierFactory = require('./GameMode/Classic/Notifier');
    var scenarioFactory = require('./GameMode/Classic/Scenario');
    var scenarioElementFactory = require('./GameMode/Classic/ScenarioElement');

    this.createNewGame = function(){
        var gameId = idGenerator.generateUniqueId();
        var gameManipulator = createDefaultGame(gameId);
        return gameManipulator;
    }

    createDefaultGame = function(gameId){
        var phase1 = new phaseFactory("Phase one", 10);
        var phase2 = new phaseFactory("Phase two", 5);
        var phases = [phase1, phase2];
        var scenario = getDefaultScenario();
        var game = new gameFactory(gameId, scenario, phases);
        var notifier = new notifierFactory();
        var playerIdGenerator = new playerIdGeneratorFactory();
        var gameManipulator = new gameManipulatorFactory(game, playerIdGenerator, notifier);
        var gameRunner = new gameRunnerFactory(gameManipulator);
        gameManipulator.setGameRunner(gameRunner);
        return gameManipulator;
    }

    function getDefaultScenario(){
        var scenarioElements = [];
        var scenarioElement1 = new scenarioElementFactory("Schuur", 1, 1);
        scenarioElements.push(scenarioElement1);
        var scenarioElement2 = new scenarioElementFactory("Kip", 1, 1);
        scenarioElements.push(scenarioElement2);
        var scenarioElement3 = new scenarioElementFactory("Schaap", 1, 1);
        scenarioElements.push(scenarioElement3);
        var scenarioElement4 = new scenarioElementFactory("Zon", 1, 1);
        scenarioElements.push(scenarioElement4);
        var scenarioElement5 = new scenarioElementFactory("Hek", 1, 1);
        scenarioElements.push(scenarioElement5);

        var scenario = new scenarioFactory("", "Kinderboerderij", scenarioElements, 5)
        return scenario;
    }
}