/**
 * Created by oteken on 6/4/2017.
 */
module.exports = function ScenarioElement(name, priority, layer){
    var name = name;
    var priority = priority;
    var layer = layer;

    this.getName = function(){
        return name;
    }

    this.getPriority = function(){
        return priority
    }

    this.getLayer = function(){
        return layer;
    }
}