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
    var allScenarios = getAllScenarios();

    this.createNewGame = function(){
        var gameId = idGenerator.generateUniqueId();
        var gameNavigator = createDefaultGame(gameId);
        return gameNavigator;
    }

    function createDefaultGame(gameId){
        var gameManipulator = new gameManipulatorFactory();

        var phases = getDefaultPhases();
        var scenario = getRandomScenario();
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
        var phase1 = new phaseFactory("Phase one", 30);
        var phase2 = new phaseFactory("Phase two", 30);
        var phase3 = new phaseFactory("Phase three", 30);
        var phases = [phase1, phase2, phase3];
        return phases;
    }

    function getAllScenarios(){
        var scenarios = [];
        scenarios.push(getFridgeScenario());
        scenarios.push(getPicknickScenario());
        scenarios.push(getUninhabitedIslandScenario());
        scenarios.push(getChildrenFarm());
        scenarios.push(getRotterdamSkylineScenario());
        return scenarios;
    }

    function getRandomScenario(){
        var totalScenarios = allScenarios.length;
        var randomInt = getRandomInt(0, totalScenarios-1);
        return allScenarios[randomInt];
    }

    function getFridgeScenario(){
        var waterBottle = new scenarioElementFactory("Water bottle", 1, 1);
        var apple = new scenarioElementFactory("Apple", 1, 1);
        var milkPack = new scenarioElementFactory("Milk pack", 1, 1);
        var butter = new scenarioElementFactory("Butter", 1, 1);
        var eggs = new scenarioElementFactory("eggs", 1, 1);
        var pizzaSlice = new scenarioElementFactory("Pizza slice", 1, 1);
        var orangeJuice = new scenarioElementFactory("Orange juice", 1, 1);
        var ham = new scenarioElementFactory("Ham", 1, 1);

        var scenarioElements = [];
        scenarioElements.push(waterBottle);
        scenarioElements.push(apple);
        scenarioElements.push(milkPack);
        scenarioElements.push(butter);
        scenarioElements.push(eggs);
        scenarioElements.push(pizzaSlice);
        scenarioElements.push(orangeJuice);
        scenarioElements.push(ham);

        var maximaalAantalSpelers = 8;
        var scenario = new scenarioFactory("", "A Fridge", scenarioElements, maximaalAantalSpelers)
        return scenario;
    }

    function getPicknickScenario(){
        var rug = new scenarioElementFactory("Rug", 1, 1);
        var basket = new scenarioElementFactory("Basket", 1, 1);
        var champagneGlass = new scenarioElementFactory("Champagne glas", 1, 1);
        var baguette = new scenarioElementFactory("Baguette", 1, 1);
        var strawberry = new scenarioElementFactory("Strawberry", 1, 1);
        var knife = new scenarioElementFactory("Knife", 1, 1);
        var fork = new scenarioElementFactory("Fork", 1, 1);
        var orangeJuice = new scenarioElementFactory("Orange juice", 1, 1);

        var scenarioElements = [];
        scenarioElements.push(rug);
        scenarioElements.push(basket);
        scenarioElements.push(champagneGlass);
        scenarioElements.push(baguette);
        scenarioElements.push(strawberry);
        scenarioElements.push(knife);
        scenarioElements.push(fork);
        scenarioElements.push(orangeJuice);

        var maximaalAantalSpelers = 8;
        var scenario = new scenarioFactory("", "Picknick", scenarioElements, maximaalAantalSpelers)
        return scenario;
    }

    function getUninhabitedIslandScenario(){
        var sea = new scenarioElementFactory("Sea", 1, 1);
        var island = new scenarioElementFactory("Island", 1, 1);
        var palmTree = new scenarioElementFactory("Palm tree", 1, 1);
        var treasure = new scenarioElementFactory("Treasure", 1, 1);
        var coconut = new scenarioElementFactory("Coconut", 1, 1);
        var hammock = new scenarioElementFactory("Hammock", 1, 1);
        var sun = new scenarioElementFactory("Sun", 1, 1);
        var bird = new scenarioElementFactory("Bird", 1, 1);

        var scenarioElements = [];
        scenarioElements.push(sea);
        scenarioElements.push(island);
        scenarioElements.push(palmTree);
        scenarioElements.push(treasure);
        scenarioElements.push(coconut);
        scenarioElements.push(hammock);
        scenarioElements.push(sun);
        scenarioElements.push(bird);

        var maximaalAantalSpelers = 8;
        var scenario = new scenarioFactory("", "Uninhabited Island", scenarioElements, maximaalAantalSpelers)
        return scenario;
    }

    function getChildrenFarm(){
        var pig = new scenarioElementFactory("Pig", 1, 1);
        var chicken = new scenarioElementFactory("Chicken", 1, 1);
        var sheep = new scenarioElementFactory("Sheep", 1, 1);
        var barn = new scenarioElementFactory("Barn", 1, 1);
        var fence = new scenarioElementFactory("Fence", 1, 1);
        var sun = new scenarioElementFactory("Sun", 1, 1);
        var horse = new scenarioElementFactory("Horse", 1, 1);
        var feedBox = new scenarioElementFactory("Feed box", 1, 1);
        var bunny = new scenarioElementFactory("Bunny", 1, 1);

        var scenarioElements = [];
        scenarioElements.push(pig);
        scenarioElements.push(chicken);
        scenarioElements.push(sheep);
        scenarioElements.push(barn);
        scenarioElements.push(fence);
        scenarioElements.push(sun);
        scenarioElements.push(horse);
        scenarioElements.push(feedBox);
        scenarioElements.push(bunny);

        var maximaalAantalSpelers = 9;
        var scenario = new scenarioFactory("", "Children's Farm", scenarioElements, maximaalAantalSpelers)
        return scenario;
    }

    function getRotterdamSkylineScenario(){
        var euromast = new scenarioElementFactory("Euromast", 1, 1);
        var erasmusbrug = new scenarioElementFactory("Erasmusbrug", 1, 1);
        var deRotterdam = new scenarioElementFactory("De Rotterdam", 1, 1);
        var markthal = new scenarioElementFactory("Markthal", 1, 1);
        var library = new scenarioElementFactory("Library(the vacuum)", 1, 1);
        var newOrleans = new scenarioElementFactory("New Orleans", 1, 1);
        var centralStation = new scenarioElementFactory("Central Station", 1, 1);
        var horizon = new scenarioElementFactory("Horizon", 1, 1);

        var scenarioElements = [];
        scenarioElements.push(euromast);
        scenarioElements.push(erasmusbrug);
        scenarioElements.push(deRotterdam);
        scenarioElements.push(markthal);
        scenarioElements.push(library);
        scenarioElements.push(newOrleans);
        scenarioElements.push(centralStation);
        scenarioElements.push(horizon);

        var maximaalAantalSpelers = 8;
        var scenario = new scenarioFactory("", "Rotterdam Skyline", scenarioElements, maximaalAantalSpelers)
        return scenario;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}