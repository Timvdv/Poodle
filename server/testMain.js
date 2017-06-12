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
var serverFactory = require('./src/Server');
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

var systemConsole = new systemConsoleFactory();
var gameIdGenerator = new idGeneratorFactory();
var gameCreator = new gameCreatorFactory(gameIdGenerator, systemConsole);
var gamesManager = new gamesManagerFactory(gameCreator);

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


