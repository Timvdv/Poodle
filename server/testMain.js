/**
 * Created by oteken on 5/9/2017.
 */
var gamesManagerFactory = require('./src/GameLogic/GamesManager');
var restApiFactory = require('./src/Adapters/RestApi');
var restDataAdapterFactory = require('./src/Adapters/RestDataAdapter');
var gameManipulatorFactory = require('./src/Gamemode/Classic/GameManipulator');
var gameFactory = require('./src/Gamemode/Classic/Game');
var serverFactory = require('./src/server');

var game = new gameFactory(1122, 2);
var gameManipulator = new gameManipulatorFactory(game);
var gameManager = new gamesManagerFactory(gameManipulator);
var restDataAdapter = new restDataAdapterFactory(gameManager);
var server = new serverFactory();
var restApi = new restApiFactory(server.getServer(), restDataAdapter);
server.startListening();