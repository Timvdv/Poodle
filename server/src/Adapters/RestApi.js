/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function RestApi(adapter){
    var express = require('express');
    var restApi = express();
    var cors = require('cors');
    var bodyParser = require('body-parser');
    restApi.use(bodyParser.urlencoded({
        extended: true
    }));
    var corsOptions = {
        origin: 'http://localhost:4200'
    }
    restApi.use(cors(corsOptions));
    restApi.use(bodyParser.json());
    var port = 3000;
    var adapter = adapter;



    this.startListening = function startListening(){
        restApi.listen(this.port);
        console.log('runningggg on ' + this.port);
    }

    this.getPort = function getPort(){
        return port;
    }
    this.setPort = function setPort(newPort){
        port = newPort;
    }

    restApi.get('/', function(req, res){
        res.send('working');
    });

    restApi.post('/image', function(req, res){
        adapter.addData(req.body, function (){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
        });
    });
}


