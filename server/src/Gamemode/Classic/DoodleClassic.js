/**
 * Created by oteken on 5/9/2017.
 */
function DoodleClassic(name){
    var name = name;
    var image;

    this.getName = function getName(){
        return this.name;
    }
    this.getImage = function getImage(){
        return this.image;
    }
    this.setImage = function setImage(image){
        this.image = image;
    }
}