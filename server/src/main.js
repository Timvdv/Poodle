/**
 * Created by oteken on 5/9/2017.
 */
var api = require('./Adapters/RestApi');
var dataholder = require('./Adapters/RestDataAdapter');
var db = new dataholder();
console.log(db.getData());
var restApi = new api(db);
restApi.port = 3000;
restApi.startListening();

