/**
 * Created by oteken on 5/9/2017.
 */
module.exports = function RestApi(server, adapter){
    var adapter = adapter;

    server.post('/image', function(req, res){
        adapter.addData(req.body, function (){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
        });
    });

    server.post('/join', function(req, res){
        adapter.joinRequest(req, function(systemResponse, gameReponse){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ response: systemResponse, addedPlayer: gameReponse }));
        });
    });
}


