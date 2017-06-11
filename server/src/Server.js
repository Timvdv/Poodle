/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function Server() {
    var path = require('path');
    var express = require('express')
    var server = express();
    var cors = require('cors');
    var corsOptions = {
        origin: 'http://localhost:4200'
    }
    server.use(cors(corsOptions));
    var bodyParser = require('body-parser');
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(bodyParser.json());
    var port = 3000;
    server.use('/assets', express.static(path.join(__dirname, '../assets')));

    this.startListening = function startListening() {
        server.listen(port);
        console.log('runningggg on ' + port);
    }

    this.getPort = function getPort(){
        return port;
    }
    this.setPort = function setPort(newPort){
        port = newPort;
    }

    this.getServer = function (){
      return server;
    }
}