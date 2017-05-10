/**
 * Created by oteken on 5/9/2017.
 */
function PlayerClassic(name, image, id){
    var name = name;
    var image = image;
    var id = id;
    var doodle;

    this.getName = function getName(){
        return this.name;
    }
    this.setName = function setName(name){
        this.name = name;
    }
    this.getImage = function getImage(){
        return this.image;
    }
    this.setImage = function setImage(image){
        this.image = image;
    }
    this.getId = function getId(){
        return this.id;
    }
    this.setId = function setId(id){
        this.id = id;
    }
    this.getDoodle = function getDoodle(){
        return this.doodle;
    }
    this.setDoodle = function setDoodle(doodle){
        this.doodle = doodle;
    }
}