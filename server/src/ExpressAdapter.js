/**
 * Created by oteken on 6/19/2017.
 */
var express = require('express');

module.exports = function ExpressAdapter(){

    this.getExpressServer = function(){
        var expressServer = express();
        return expressServer;
    }
}

