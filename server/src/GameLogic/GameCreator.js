/**
 * Created by oteken on 5/27/2017.
 */
var gameNavigatorFactory = require('./GameMode/Classic/GameNavigator');
var gameManipulatorFactory = require('./GameMode/Classic/GameManipulator');
var gameFactory = require('./GameMode/Classic/Game');
var playerIdGeneratorFactory = require('./IdGenerator');
var notifierFactory = require('./GameMode/Classic/Notifier');
var gameRunnerFactory = require('./GameMode/Classic/GameRunner');

var phaseFactory = require('./GameMode/Classic/Phase');
var scenarioFactory = require('./GameMode/Classic/Scenario');
var scenarioElementFactory = require('./GameMode/Classic/ScenarioElement');

module.exports = function GameCreator(idGenerator, systemConsole){
    var idGenerator = idGenerator;
    var systemConsole = systemConsole;

    this.createNewGame = function(){
        var gameId = idGenerator.generateUniqueId();
        var gameNavigator = createDefaultGame(gameId);
        return gameNavigator;
    }

    function createDefaultGame(gameId){
        var gameManipulator = new gameManipulatorFactory();

        var phases = getDefaultPhases();
        var scenario = getDefaultScenario();
        var game = new gameFactory(gameId, scenario, phases);

        var playerIdGenerator = new playerIdGeneratorFactory();
        var notifier = new notifierFactory();
        var gameRunner = new gameRunnerFactory();

        var gameNavigator = new gameNavigatorFactory(gameManipulator, game, playerIdGenerator, notifier, gameRunner);

        gameManipulator.setGameNavigatorAndGetDependencies(gameNavigator);
        gameRunner.setGameNavigatorAndGetDependencies(gameNavigator);
        notifier.setConsole(systemConsole);

        return gameNavigator;
    }

    function getDefaultPhases(){
        var phase1 = new phaseFactory("Phase one", 10);
        var phase2 = new phaseFactory("Phase two", 5);
        var phase3 = new phaseFactory("Phase three", 7);
        var phases = [phase1, phase2, phase3];
        return phases;
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