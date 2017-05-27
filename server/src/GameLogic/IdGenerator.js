/**
 * Created by oteken on 5/17/2017.
 */
module.exports = function IdGenerator(){

    var ids = [];
    var idLength = 4;

    this.generateUniqueId = function(){
        var newId = generateId();
        while(arrayContains(ids, newId)){
            newId = generateId();
        }
        ids.push(newId);
        return newId;
    }

    function generateId(){
        var s = "";
        for (var i = 0; i < 4; i++) {
            s += generateRandomNumber(1, 10);
        }
        return s;
    }

    function generateRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min)) + min
    }

    function arrayContains(array, object){
        for (var i = 0; i < array.length; i++) {
            if(array[i] === object)
                return true;
        }
        return false;
    }

}