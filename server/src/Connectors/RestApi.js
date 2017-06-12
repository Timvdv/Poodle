/**
 * Created by oteken on 5/9/2017.
 */

/*
 * This class is responsible for receiving requests and
 * sending the data of the request to the adapter object.
 * The adapter sends a response back from the system and
 * this response is returned to the caller.
 */
module.exports = function RestApi(server, adapter){
    var server = server;
    var adapter = adapter;
    var path = require('path');

    server.post('/doodle', function(req, res){
        adapter.saveDoodle(req, function (systemResponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(systemResponse);
        });
    });

    server.post('/join', function(req, res){
        adapter.joinRequest(req, function(systemResponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(systemResponse);
        });
    });

    server.get('/newGame', function(req, res){
        adapter.newGameCommand(function(systemResponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(systemResponse);
        })
    });

    server.post('/startGame', function(req, res){
        adapter.startGameRequest(req, function(systemResponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(systemResponse);
        });
    });

    server.all('*', function(req, res) {
       res.sendFile( path.resolve(__dirname + "/../dist/index.html") );
    });
}


