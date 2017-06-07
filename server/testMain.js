/**
 * Created by oteken on 5/9/2017.
 */
var imagesManagerFactory = require('./src/ImagesManager');
var imageWriterFactory = require('./src/ImageWriter');
var notifierFactory = require('./src/GameLogic/GameMode/Classic/Notifier');
var notificationAdapterFactory = require('./src/Adapters/NotificationAdapter');
var systemNavigatorFactory = require('./src/SystemNavigator');
var gamesManagerFactory = require('./src/GameLogic/GamesManager');
var restApiFactory = require('./src/Connectors/RestApi');
var restDataAdapterFactory = require('./src/Adapters/RestDataAdapter');

var gameManipulatorFactory = require('./src/GameLogic/GameMode/Classic/GameManipulator');
var gameFactory = require('./src/GameLogic/GameMode/Classic/Game');
var serverFactory = require('./src/server');
var socketConnectionFactory = require('./src/Connectors/SocketConnection');
var socketDataAdapterFactory = require('./src/Adapters/SocketDataAdapter');
var idGeneratorFactory = require('./src/GameLogic/IdGenerator');
var phaseFactory = require('./src/GameLogic/GameMode/Classic/Phase');
var startGameCommandFactory = require('./src/GameLogic/Commands/StartGameCommand');
var gameRunnerFactory = require('./src/GameLogic/GameMode/Classic/GameRunner');
var systemConsoleFactory = require('./src/GameLogic/Console');
var gameCreatorFactory = require('./src/GameLogic/GameCreator');
var scenarioFactory = require('./src/GameLogic/GameMode/Classic/Scenario');
var scenarioElementFactory = require('./src/GameLogic/GameMode/Classic/ScenarioElement');


var startGameCommand = new startGameCommandFactory(1122);

var phase1 = new phaseFactory("Phase one", 10);
var phase2 = new phaseFactory("Phase two", 5);
var phases = [phase1, phase2];


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
var game = new gameFactory(1122, scenario, phases);

var playerIdGenerator = new idGeneratorFactory();

var notifier = new notifierFactory();
var gameManipulator = new gameManipulatorFactory(game, playerIdGenerator, notifier);
var gameRunner = new gameRunnerFactory(gameManipulator);
gameManipulator.setGameRunner(gameRunner);

var gameIdGenerator = new idGeneratorFactory();
var gameCreator = new gameCreatorFactory(gameIdGenerator);
var gamesManager = new gamesManagerFactory(gameCreator);
gamesManager.addGameManipulator(gameManipulator);

var systemConsole = new systemConsoleFactory();
notifier.setConsole(systemConsole);

var restDataAdapter = new restDataAdapterFactory(systemConsole);
var socketDataAdapter = new socketDataAdapterFactory(systemConsole);

var server = new serverFactory();
var restApi = new restApiFactory(server.getServer(), restDataAdapter);
var socketConnection = new socketConnectionFactory(socketDataAdapter);

var notificationAdapter = new notificationAdapterFactory(socketConnection);

var imageWriter = new imageWriterFactory();
var imagesManager = new imagesManagerFactory(imageWriter);

var systemNavigator = new systemNavigatorFactory(gamesManager, systemConsole, notificationAdapter, imagesManager);
systemConsole.setNavigator(systemNavigator);

server.startListening();


