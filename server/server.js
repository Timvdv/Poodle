var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var socketInfo = {};

app.listen(8087);

function handler (req, res) {
  fs.readFile(__dirname + '/dist/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
    socketInfo[socket.id]  = [];
    socketInfo[socket.id].socket =  socket;

    socket.emit('news', { hello: 'world' });

    socket.on('my other event', function (data) {
        console.log(data);
    });

    // BROADCAST VOORBEELD: socket.broadcast.emit('news', pixel_array);

    socket.on('disconnect', function (data) {
        delete socketInfo[socket.id];
    });
});