/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function RestApi(adapter){
    var express = require('express');
    var restApi = express();
    var bodyParser = require('body-parser');
    restApi.use(bodyParser.urlencoded({
        extended: true
    }));
    restApi.use(bodyParser.json());
    var port = 3000;
    var adapter = adapter;

    this.startListening = function startListening(){
        restApi.listen(this.port);
        console.log('runningggg on ' + this.port);
    }

    this.getPort = function getPort(){
        return this.port;
    }
    this.setPort = function setPort(port){
        this.port = port;
    }

    restApi.get('/', function(req, res){
        res.send('working');
    });

    restApi.post('/image', function(req, res){
        adapter.addData(req.body, function (){
            res.send('thankyou 4 data');
        });

    });
}


