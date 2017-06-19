/**
 * Created by oteken on 6/19/2017.
 */
var express = require('express');
var packageJson = require('../package.json');

module.exports = function ExpressAdapter(){

    this.getExpressServer = function(){
        var expressServer;
        var expressVersion = getExpressVersion();
        if(expressVersion == "^4.15.2") {
            expressServer = express();
        }
        return expressServer;
    }

    function getExpressVersion(){
        return packageJson.dependencies.express;
    }
}

