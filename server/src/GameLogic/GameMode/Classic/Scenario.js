/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function Scenario(name, paintingName, elements, maximumPlayers){
    var name = name;
    var paintingName = paintingName;
    var elements = elements;
    var maximumPlayers = maximumPlayers;

    this.getName = function getName(){
        return name;
    }

    this.getPaintingName = function(){
        return paintingName;
    }

    this.getElements = function(){
        return elements;
    }

    this.getMaximumPlayers = function(){
        return maximumPlayers;
    }
}