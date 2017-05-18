/**
 * Created by oteken on 5/9/2017.
 */
var gamesManagerFactory = require('./src/GameLogic/GamesManager');
var restApiFactory = require('./src/Adapters/RestApi');
var restDataAdapterFactory = require('./src/Adapters/RestDataAdapter');
var gameManipulatorFactory = require('./src/Gamemode/Classic/GameManipulator');
var gameFactory = require('./src/Gamemode/Classic/Game');
var serverFactory = require('./src/server');
var socketConnectionFactory = require('./src/Adapters/SocketConnection');
var playerIdGeneratorFactory = require('./src/GameLogic/PlayerIdGenerator');
var phaseFactory = require('./src/Gamemode/Classic/Phase');
var startGameCommandFactory = require('./src/GameLogic/startGameCommand');
var gameRunnerFactory = require('./src/Gamemode/Classic/GameRunner');

var startGameCommand = new startGameCommandFactory(1122);
var phase1 = new phaseFactory("Phase one", 10);
var phase2 = new phaseFactory("Phase two", 5);
var phases = [phase1, phase2];
var game = new gameFactory(1122, 2, phases);
var playerIdGenerator = new playerIdGeneratorFactory();
var gameManipulator = new gameManipulatorFactory(game, playerIdGenerator);
var gameRunner = new gameRunnerFactory(gameManipulator);
var gamesManager = new gamesManagerFactory(gameManipulator, gameRunner);
var restDataAdapter = new restDataAdapterFactory(gamesManager);
var server = new serverFactory();
var restApi = new restApiFactory(server.getServer(), restDataAdapter);
var socketConnection = new socketConnectionFactory(server, 0);
server.startListening();
gamesManager.executeCommandTest(startGameCommand);
