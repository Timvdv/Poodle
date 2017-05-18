/**
 * Created by oteken on 5/18/2017.
 */
module.exports = function Phase(description, durationTime){
    var description;
    var durationTime;
    var startTime;
    var endTime;

    this.getDescription = function(){
        return description;
    }

    this.getDurationTime = function(){
        return durationTime;
    }

    this.getStartTime = function(){
        return startTime;
    }
    this.setStartTime = function(time){
        startTime = time;
    }

    this.getEndTime = function(){
        return endTime;
    }
    this.setEndTime = function(time){
        endTime = time;
    }
}