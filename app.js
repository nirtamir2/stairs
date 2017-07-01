var express = require('express')
var app = express()
var path = require("path");

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static(__dirname + '/static'));

var i = 0;

app.get('/floor/:floorNumber', function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    i++;


    console.log(i)
    console.log(ip)

    res.send(ip)
});

app.listen(8081)