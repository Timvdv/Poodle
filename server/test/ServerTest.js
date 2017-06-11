/**
 * Created by oteken on 6/11/2017.
 */
var assert = require('chai').assert;
var ServerFactory = require('../src/Server');


describe('Server', function(){
    var defaultPort = 3000;
    var server = new ServerFactory();
    it('Server on default port', function(){
        var port = server.getPort();
        assert.equal(port, defaultPort);
    });
});
