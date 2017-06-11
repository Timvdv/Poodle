/**
 * Created by oteken on 6/11/2017.
 */
var assert = require('chai').assert;
var gameCreatorFactory = require('../src/GameLogic/GameCreator');
var idGeneratorFactory = require('../src/GameLogic/IdGenerator');

describe('GameCreator', function(){
    var idGenerator = new idGeneratorFactory();
    var gameCreator = new gameCreatorFactory(idGenerator);
    var gameResult = gameCreator.createNewGame();
    it('Amount of phases', function(){
        var amountOfPhasesResult = gameResult.getGame().getPhases().length;
        var amountOfPhasesExpected = 3;
        assert.equal(amountOfPhasesResult, amountOfPhasesExpected);
    });
    it('Has notifier', function(){
        var notifier = gameResult.getNotifier();
        assert.notEqual(notifier, undefined);
    });
    it('Has game runner', function(){
        var gameRunner = gameResult.getGameRunner();
        assert.notEqual(gameRunner, undefined);
    });
    it('Has scenario', function(){
        var scenario = gameResult.getGame().getScenario();
        assert.notEqual(scenario, undefined);
    });
});