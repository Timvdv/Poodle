/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function RestDataAdapter(){
    var holdingData = [5];

    this.addData = function(data){
        holdingData.push(data);
        console.log("added: " + data);
        console.log("now: " + holdingData);
    }
    this.getData = function(){
        return holdingData;
    }
}