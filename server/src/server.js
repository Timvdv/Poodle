var app = require('http').createServer(handler)

var fs = require('fs');

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

