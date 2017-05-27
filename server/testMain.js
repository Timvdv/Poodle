/**
 * Created by oteken on 5/9/2017.
 */
var gamesManagerFactory = require('./src/GameLogic/GamesManager');
var restApiFactory = require('./src/Connectors/RestApi');
var restDataAdapterFactory = require('./src/Adapters/RestDataAdapter');
var gameManipulatorFactory = require('./src/GameLogic/GameMode/Classic/GameManipulator');
var gameFactory = require('./src/GameLogic/GameMode/Classic/Game');
var serverFactory = require('./src/server');
var socketConnectionFactory = require('./src/Connectors/SocketConnection');
var idGeneratorFactory = require('./src/GameLogic/IdGenerator');
var phaseFactory = require('./src/GameLogic/GameMode/Classic/Phase');
var startGameCommandFactory = require('./src/GameLogic/Commands/StartGameCommand');
var gameRunnerFactory = require('./src/GameLogic/GameMode/Classic/GameRunner');
var systemConsoleFactory = require('./src/GameLogic/SystemConsole');
var gameCreatorFactory = require('./src/GameLogic/GameCreator');

var startGameCommand = new startGameCommandFactory(1122);
var phase1 = new phaseFactory("Phase one", 10);
var phase2 = new phaseFactory("Phase two", 5);
var phases = [phase1, phase2];
var game = new gameFactory(1122, 2, phases);
var playerIdGenerator = new idGeneratorFactory();
var gameIdGenerator = new idGeneratorFactory();
var gameCreator = new gameCreatorFactory(gameIdGenerator);
var gameManipulator = new gameManipulatorFactory(game, playerIdGenerator);
var gameRunner = new gameRunnerFactory(gameManipulator);
gameManipulator.setGameRunner(gameRunner);
var gamesManager = new gamesManagerFactory(gameCreator);
gamesManager.addGameManipulator(gameManipulator);
var systemConsole = new systemConsoleFactory(gamesManager);
var restDataAdapter = new restDataAdapterFactory(systemConsole);
var server = new serverFactory();
var restApi = new restApiFactory(server.getServer(), restDataAdapter);
var socketConnection = new socketConnectionFactory(server, 0);
server.startListening();
systemConsole.executeCommand(startGameCommand);
