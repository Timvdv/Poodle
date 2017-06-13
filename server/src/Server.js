/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function Server() {
    var path = require('path');
    var express = require('express')
    var server = express();
    var cors = require('cors');

    server.use(function(req,res,next){ req.headers.origin = req.headers.origin || req.headers.host; next(); })

    var allowedOrigins = [
        'localhost:8087',
        'localhost:8087',
        'localhost:4200',
        'http://localhost:4200',
        '127.0.0.1:3000',
        '127.0.0.1:4200',
        '178.62.238.8:8087',
        '178.62.238.8',
        'www.timvandevathorst.nl',
        'www.timvandevathorst.nl:8087',
        'www.timvandevathorst.nl/poodle/',
        'http://timvandevathorst.nl:8087',
        'http://timvandevathorst.nl',
        'timvandevathorst.nl',
        'timvandevathorst.nl:8087',
        'timvandevathorst.nl/poodle/',
    ];

    var corsOptions = {
        origin: function (origin, callback) {
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                //tmp allow all
//              callback(null, true)

                callback(new Error('Not allowed by CORS'))
            }
        },
        "credentials": true
    }

    server.use(cors(corsOptions));

    var bodyParser = require('body-parser');
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(bodyParser.json());
    var port = 8087;

    server.use('/assets', express.static(path.join(__dirname, '/../assets')));
    server.use('/poodle/', express.static(path.join(__dirname, '/../dist')));

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