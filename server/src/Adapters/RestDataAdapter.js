/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function RestDataAdapter(){
    var holdingData = [5];

    this.addData = function(data, executeResponse){
        holdingData.push(data);
        console.log("added: " + data);
        console.log("now: " + holdingData);
        executeResponse();
    }
    this.getData = function(){
        return holdingData;
    }
}