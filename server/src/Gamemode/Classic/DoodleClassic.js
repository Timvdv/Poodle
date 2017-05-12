/**
 * Created by oteken on 5/9/2017.
 */
function DoodleClassic(name){
    var name = name;
    var image;

    this.getName = function getName(){
        return name;
    }
    this.getImage = function getImage(){
        return image;
    }
    this.setImage = function setImage(newImage){
        image = newImage;
    }
}