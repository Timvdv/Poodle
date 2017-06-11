/**
 * Created by oteken on 5/30/2017.
 */
module.exports = function SystemNavigator(gamesManager, console, notificationAdapter, imagesManager){

    var gamesManager = gamesManager;
    var console = console;
    var notificationAdapter = notificationAdapter;
    var imagesManager = imagesManager;

    this.getGamesManager = function(){
        return gamesManager;
    }

    this.getConsole = function(){
        return console;
    }

    this.getNotificationAdapter = function(){
        return notificationAdapter;
    }

    this.getImagesManager = function(){
        return imagesManager;
    }
}