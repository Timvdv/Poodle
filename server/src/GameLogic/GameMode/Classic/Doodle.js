/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function DoodleClassic(name, priority, layer){
    var name = name;
    var priority = priority;
    var layer = layer;
    var image;

    this.getName = function getName(){
        return name;
    }
    this.getPriority = function(){
        return priority
    }
    this.getLayer = function(){
        return layer;
    }
    this.getImage = function getImage(){
        return image;
    }

    this.setImage = function setImage(newImage){
        image = newImage;
    }
}