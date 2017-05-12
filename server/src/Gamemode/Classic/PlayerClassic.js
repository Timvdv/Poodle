/**
 * Created by oteken on 5/9/2017.
 */
function PlayerClassic(name, image, id){
    var name = name;
    var image = image;
    var id = id;
    var doodle;

    this.getName = function getName(){
        return name;
    }
    this.setName = function setName(newName){
        name = newName;
    }
    this.getImage = function getImage(){
        return image;
    }
    this.setImage = function setImage(newImage){
        image = newImage;
    }
    this.getId = function getId(){
        return id;
    }
    this.setId = function setId(newId){
        id = newId;
    }
    this.getDoodle = function getDoodle(){
        return doodle;
    }
    this.setDoodle = function setDoodle(newDoodle){
        doodle = newDoodle;
    }
}